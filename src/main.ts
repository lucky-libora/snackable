import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = await app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT'));
}

bootstrap();
