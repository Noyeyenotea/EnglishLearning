import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  providers: [PayService],
  exports: [PayService],
})
export class PayModule {}
