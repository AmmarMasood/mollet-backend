import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //doing this will filter all the fields that are send by user but not present in our dto
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
