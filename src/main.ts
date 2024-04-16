import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      // forbidNonWhitelisted: true,
      exceptionFactory(errors) {
        const message = [];
        errors.forEach((error) =>
          message.push(error.constraints[Object.keys(error.constraints)[0]]),
        );
        return new BadRequestException(message);
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Api Project ')
    .setDescription('API descriptions Subject ')
    .setVersion('1.0')
    .addTag('User')
    .addTag('Product')
    .addTag('Cart')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
