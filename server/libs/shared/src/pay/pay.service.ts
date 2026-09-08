import { Injectable, OnModuleInit } from '@nestjs/common';
import { AlipaySdk } from 'alipay-sdk';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PayService implements OnModuleInit {
  public alipaySdk: AlipaySdk = {} as AlipaySdk;
  constructor(private readonly configService: ConfigService) {}
  onModuleInit() {
    this.alipaySdk = new AlipaySdk({
      appId: this.configService.get<string>('ALIPAY_APP_ID')!,
      privateKey: this.configService.get<string>('ALIPAY_PRIVATE_KEY')!,
      alipayPublicKey: this.configService.get<string>('ALIPAY_PUBLIC_KEY')!,
      gateway: this.configService.get<string>('ALIPAY_GATEWAY')!,
    });
    const bizContent = {
      out_trade_no: 'ALIPfdf1211sdfsd12gfddsgs3',
      product_code: 'FAST_INSTANT_TRADE_PAY',
      subject: 'abc',
      body: '234',
      total_amount: '0.01',
    };

    // 支付页面接口，返回 HTML 代码片段，内容为 Form 表单
    const html = this.alipaySdk.pageExecute('alipay.trade.page.pay', 'GET', {
      bizContent,
      returnUrl: 'https://www.taobao.com',
    });
    console.log(html);
  }

  getAlipaySdk() {
    return this.alipaySdk;
  }
}
