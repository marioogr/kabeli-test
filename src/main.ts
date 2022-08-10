import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  // TODO: condicionar el Swagger para qa y dev unicamente
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('MicroService')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);

  app
    .useStaticAssets(join(__dirname, '../public'), {
      prefix: '/api/public/',
      index: false,
      redirect: false,
    })
    .enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
