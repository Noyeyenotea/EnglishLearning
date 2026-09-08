import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/shared';
import { ResponseService } from '@libs/shared';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MinioService } from '@libs/shared/minio/minio.service';
import { ConfigService } from '@nestjs/config';
import type {
  UserLogin,
  UserRegister,
  Token,
  RefreshTokenPayload,
  UserUpdate,
} from '@en/common/user';
import type { Prisma } from '@libs/shared/generated/prisma/client';
import { updateUserSelect, userSelect } from './user.select';
import type { Request } from 'express';
//返回给前端的用户信息

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly response: ResponseService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly minioService: MinioService,
    private readonly configService: ConfigService,
  ) {}
  async login(CreateUserDto: UserLogin) {
    //1. 检查手机号是否存在
    const user = await this.prisma.user.findUnique({
      where: {
        phone: CreateUserDto.phone,
      },
    });
    if (!user) {
      return this.response.error(null, '手机号不存在');
    }
    //2. 检查密码是否正确
    if (user.password !== CreateUserDto.password) {
      return this.response.error(null, '密码不正确');
    }
    //3. 查询用户信息 更新最后登录时间
    const updateUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLoginAt: new Date(),
      },
      select: userSelect,
    });
    const token = this.authService.generateToken({
      userId: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
    });
    return this.response.success({ ...updateUser, token });
  }
  async register(createUserDto: UserRegister) {
    const data: Prisma.UserCreateInput = {
      name: createUserDto.name,
      phone: createUserDto.phone,
      password: createUserDto.password,
      lastLoginAt: new Date(), //最后登录时间
    };
    //手机号不能重复
    const phoneUser = await this.prisma.user.findUnique({
      where: {
        phone: createUserDto.phone,
      },
    });
    if (phoneUser) {
      return this.response.error(null, '手机号已存在');
    }
    //如果传入了邮箱且邮箱已存在
    if (createUserDto.email) {
      const emailUser = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });
      if (emailUser) {
        return this.response.error(null, '邮箱已存在');
      }
    }
    data.email = createUserDto.email;
    const user = await this.prisma.user.create({
      data,
      select: userSelect,
    });
    //4. 生成token
    const token = this.authService.generateToken({
      userId: user.id,
      name: user.name,
      email: user.email,
    });
    return this.response.success({ ...user, token });
  }
  //刷新token
  async refreshToken(createUserDto: Omit<Token, 'accessToken'>) {
    //1. 验证refreshToken是否有效

    const decoded = this.jwtService.verify<RefreshTokenPayload>(
      createUserDto.refreshToken,
    );

    if (decoded.tokenType !== 'refresh') {
      return this.response.error(null, 'refreshToken已过期或无效');
    }
    //2. 查询用户信息分辨是否伪造payload
    const user = await this.prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    if (!user) {
      return this.response.error(null, '用户不存在');
    }
    //3. 生新的token
    const token = this.authService.generateToken({
      userId: user.id,
      name: user.name,
      email: user.email,
    });
    return this.response.success({ token });
  }
  //上传头像
  async uploadAvatar(file: Express.Multer.File) {
    if (!file) {
      return this.response.error(null, '文件不存在');
    }
    if (file.size > 1024 * 1024 * 5) {
      return this.response.error(null, '文件大小不能超过5MB');
    }
    if (!file.mimetype.includes('image')) {
      return this.response.error(null, '文件类型不支持');
    }
    const fileName = `${Date.now()}-${file.originalname}`;
    const client = this.minioService.getClient();
    const bucket = this.minioService.getBucket();
    await client.putObject(bucket, fileName, file.buffer, file.size, {
      'Content-Type': file.mimetype,
    });
    const isHttps = !!Number(this.configService.get('MINIO_USE_SSL'));
    const baseUrl = isHttps ? 'https' : 'http';
    const port = this.configService.get<string>('MINIO_PORT');
    const databaseUrl = `/${bucket}/${fileName}`;
    const previewUrl = `${baseUrl}://${this.configService.get<string>('MINIO_ENDPOINT')}:${port}${databaseUrl}`;
    return this.response.success({
      previewUrl,
      databaseUrl,
    });
  }
  //更新用户信息
  async updateUser(createUserDto: UserUpdate, user: Request['user']) {
    const updatedUser = await this.prisma.user.update({
      where: { id: user!.userId },
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        address: createUserDto.address,
        avatar: createUserDto.avatar,
        bio: createUserDto.bio,
        isTimingTask: createUserDto.isTimingTask,
        timingTaskTime: createUserDto.timingTaskTime,
      },
      select: updateUserSelect,
    });

    return this.response.success(updatedUser);
  }
}
