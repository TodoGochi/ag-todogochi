import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './common/environment/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = Config.getEnvironment().PORT;
  await app.listen(port);
}
bootstrap();
