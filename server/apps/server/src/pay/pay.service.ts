import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreatePayDto } from '@en/common/pay';
import type { TokenPayload } from '@en/common/user';
import { SocketGateway } from '../socket/socket.gateway';
import {
  PrismaService,
  PayService as SharedPayService,
  ResponseService,
} from '@libs/shared';
import * as nanoid from 'nanoid';
import dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { TradeStatus } from '@libs/shared/generated/prisma/enums';

interface AlipayNotifyBody {
  out_trade_no: string;
  trade_no: string;
  gmt_payment: string;
  body: string;
}

interface PaymentNotifyBody {
  courseId: string;
  userId: string;
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isAlipayNotifyBody = (value: unknown): value is AlipayNotifyBody => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.out_trade_no === 'string' &&
    typeof value.trade_no === 'string' &&
    typeof value.gmt_payment === 'string' &&
    typeof value.body === 'string'
  );
};

const parsePaymentNotifyBody = (body: string): PaymentNotifyBody => {
  const parsed: unknown = JSON.parse(body);

  if (!isObject(parsed)) {
    throw new BadRequestException('Invalid payment notify body');
  }

  if (
    typeof parsed.courseId !== 'string' ||
    typeof parsed.userId !== 'string'
  ) {
    throw new BadRequestException('Invalid payment notify body');
  }

  return {
    courseId: parsed.courseId,
    userId: parsed.userId,
  };
};

@Injectable()
export class PayService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly responseService: ResponseService,
    private readonly sharedPayService: SharedPayService,
    private readonly socketGateway: SocketGateway,
  ) {}

  private createTradeNo() {
    const prifix = 'XM'; //订单前缀
    return `${prifix}-${nanoid.nanoid(12)}`;
  }
  async create(createPayDto: CreatePayDto, user: TokenPayload) {
    //购买过课程不能重复购买
    const courseRecord = await this.prismaService.courseRecord.findFirst({
      where: {
        userId: user.userId,
        courseId: createPayDto.courseId,
      },
    });
    if (courseRecord) {
      return this.responseService.error(null, '您已经购买过该课程');
    }
    const result = await this.prismaService.$transaction(async (tx) => {
      //1. 创建订单表 但是状态是未支付
      const outTradeNo = this.createTradeNo();
      await tx.paymentRecord.create({
        data: {
          userId: user.userId, //用户id
          outTradeNo: outTradeNo, //订单编号
          amount: createPayDto.total_amount, //支付金额
          subject: createPayDto.subject, //支付主题
          body: createPayDto.body, //支付内容
        },
      });
      //2.支付宝SDK发起支付生成url
      const dateTime = dayjs().add(1, 'minute'); //当前的时间增加了一分钟 为了测试我弄的快一点
      const payUrl = this.sharedPayService
        .getAlipaySdk()
        .pageExecute('alipay.trade.page.pay', 'GET', {
          bizContent: {
            out_trade_no: outTradeNo, //订单编号
            total_amount: createPayDto.total_amount, //支付金额
            subject: createPayDto.subject, //支付主题
            body: JSON.stringify({
              courseId: createPayDto.courseId, //课程id
              userId: user.userId, //用户id
            }), //支付内容
            product_code: 'FAST_INSTANT_TRADE_PAY', //产品编码
            time_expire: dateTime.format('YYYY-MM-DD HH:mm:ss'),
          },
          notify_url: `${this.configService.get<string>('ALIPAY_NOTIFY_URL')!}/api/v1/pay/notify`,
        });
      return {
        payUrl, //返回支付宝的支付链接
        timeExpire: dateTime.toDate().getTime(), //迎合Elementplus组件要求是时间戳
      };
    });
    return this.responseService.success(result);
  }

  async notify(body: unknown) {
    if (!isAlipayNotifyBody(body)) {
      throw new BadRequestException('Invalid alipay notify body');
    }

    const paymentBody = parsePaymentNotifyBody(body.body);

    await this.prismaService.$transaction(async (tx) => {
      //1.更新支付库 支付时间 + 支付宝交易号 + 支付状态
      const paymentRecord = await tx.paymentRecord.update({
        where: {
          outTradeNo: body.out_trade_no, //拿到了订单编号
        },
        data: {
          tradeNo: body.trade_no, //拿到了支付宝交易号
          tradeStatus: TradeStatus.TRADE_SUCCESS, //拿到了支付状态
          sendPayTime: dayjs(body.gmt_payment).toDate(), //拿到了支付时间
        },
      });
      //2.创建我的课程
      await tx.courseRecord.create({
        data: {
          userId: paymentBody.userId, //拿到了用户id
          courseId: paymentBody.courseId, //拿到了课程id
          isPurchased: true, //是否购买
          paymentRecordId: paymentRecord.id, //拿到了支付记录id
        },
      });
      //加一个通知前端socket
      this.socketGateway.emitPaymentSuccess(paymentBody.userId);
    });
    return true;
  }
}
