import {
  Controller,
  Post,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Token } from '@en/common/user';
import { AuthGuard } from '@libs/shared/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { UserLogin, UserRegister, UserUpdate } from '@en/common/user';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //登录
  @Post('login')
  login(@Body() createUserDto: UserLogin) {
    return this.userService.login(createUserDto);
  }
  //注册
  @Post('register')
  async register(@Body() createUserDto: UserRegister) {
    return this.userService.register(createUserDto);
  }
  //刷新token 只需要一个参数 refreshToken
  @Post('refresh-token')
  refreshToken(@Body() createUserDto: Omit<Token, 'accessToken'>) {
    return this.userService.refreshToken(createUserDto);
  }

  //上传头像
  @UseGuards(AuthGuard)
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(file);
  }
  //更新用户信息
  @UseGuards(AuthGuard)
  @Post('update-user')
  updateUser(@Body() createUserDto: UserUpdate, @Req() req: Request) {
    const user = req.user;
    return this.userService.updateUser(createUserDto, user);
  }
}
