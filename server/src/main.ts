import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('AAAAAA')
  const app = await NestFactory.create(AppModule);
  console.log('BBBBBB')

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT || 5000);
  console.log('CONNECTED TO DATABASE')
}
bootstrap();
