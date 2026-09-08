import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from '@en/config';
import { VersioningType } from '@nestjs/common';
import { InterceptorInterceptor } from '@libs/shared/interceptor/interceptor';
import { InterceptorExceptionFilter } from '@libs/shared/interceptor/exceptionFilter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new InterceptorInterceptor());
  app.useGlobalFilters(new InterceptorExceptionFilter());
  app.setGlobalPrefix('api');
  // 版本控制
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(Config.ports.server);
}
bootstrap();
