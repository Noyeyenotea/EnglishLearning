import { Injectable } from '@nestjs/common';
import type { TokenPayload } from '@en/common/user';
import * as nanoid from 'nanoid';
import { PrismaService } from '@libs/shared';
import type { CreatePayDto } from '@en/common/pay';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import { PayService as SharedPayService, ResponseService } from '@libs/shared';
@Injectable()
export class PayService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sharedPayService: SharedPayService,
    private readonly responseService: ResponseService,
    private readonly configService: ConfigService,
  ) {}
  private createTradeNo() {
    const prifix = 'XM'; //订单前缀
    return `${prifix}-${nanoid.nanoid(12)}`;
  }
  async create(createPayDto: CreatePayDto, user: TokenPayload) {
    const courseRecord = await this.prisma.courseRecord.findFirst({
      where: {
        userId: user.userId,
        courseId: createPayDto.courseId,
      },
    });
    if (courseRecord) {
      return this.responseService.error(null, '您已经购买过该课程');
    }
    //事务
    const res = await this.prisma.$transaction(async (tx) => {
      //创建订单
      //创建订单号
      const outTradeNo = this.createTradeNo();
      await tx.paymentRecord.create({
        data: {
          userId: user.userId,
          amount: createPayDto.total_amount,
          subject: createPayDto.subject,
          body: createPayDto.body,
          outTradeNo: outTradeNo,
        },
      });
      //生成支付链接
      const dateTime = dayjs().add(2, 'minute');
      console.log(dateTime);
      console.log(dateTime.toDate().getTime());

      const result = this.sharedPayService.alipaySdk.pageExecute(
        'alipay.trade.page.pay',
        'GET',
        {
          bizContent: {
            total_amount: createPayDto.total_amount,
            subject: createPayDto.subject,
            body: JSON.stringify({
              courseId: createPayDto.courseId,
              userId: user.userId,
            }),
            out_trade_no: outTradeNo,
            product_code: 'FAST_INSTANT_TRADE_PAY',
            time_expire: dateTime.format('YYYY-MM-DD HH:mm:ss'), //1分钟过期
          },
          notify_url: `${this.configService.get<string>('ALIPAY_NOTIFY_URL')!}/api/v1/pay/notify`,
        },
      );
      return {
        payUrl: result,
        timeExpire: dateTime.toDate().getTime(),
      };
    });
    return this.responseService.success(res);
  }
  notify(req: Request) {
    console.log(req.body);

    return true;
  }
}
