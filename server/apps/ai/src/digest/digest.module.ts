import { Module } from '@nestjs/common';
import { DigestService } from './digest.service';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { digestQueueName } from './digest.queue';
import { DigestProcessor } from './digest.processor';
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: Number(configService.get('REDIS_PORT', 6379)),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: digestQueueName.name, //注册消息队列的名称
    }),
  ],
  providers: [DigestService, DigestProcessor],
})
export class DigestModule {}
