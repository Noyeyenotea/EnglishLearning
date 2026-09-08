import { Controller, Post, Body, Req, All } from '@nestjs/common';
import { PayService } from './pay.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@libs/shared/auth/auth.guard';
import type { CreatePayDto } from '@en/common/pay';
import type { Request } from 'express';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createPayDto: CreatePayDto, @Req() req: Request) {
    return this.payService.create(createPayDto, req.user!);
  }

  @All('notify')
  notify(@Req() req: Request) {
    console.log(req.body);
    return this.payService.notify(req.body);
  }
}
