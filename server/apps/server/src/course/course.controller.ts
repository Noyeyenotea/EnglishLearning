import {
  Controller,
  Get,
  UnauthorizedException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from '@libs/shared';
import type { Request } from 'express';
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('list')
  findAll() {
    return this.courseService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('my')
  findMy(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    return this.courseService.findMy(req.user.userId);
  }
}
