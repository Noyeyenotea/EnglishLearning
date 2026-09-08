import { Module, Global } from '@nestjs/common';
import { SharedService } from './shared.service';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseModule } from './response/response.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';
import { MinioModule } from './minio/minio.module';
import { PayModule } from './pay/pay.module';
@Global()
@Module({
  providers: [SharedService, AuthGuard],
  exports: [
    SharedService,
    PrismaModule,
    ResponseModule,
    JwtModule,
    AuthGuard,
    MinioModule,
    PayModule,
  ],
  imports: [
    PrismaModule,
    ResponseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('SECRET_KEY'), //秘钥
        signOptions: { expiresIn: 10 }, //10秒过期 方便测试
      }),
      inject: [ConfigService],
    }),
    MinioModule,
    PayModule,
  ],
})
export class SharedModule {}
