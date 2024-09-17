import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './common/environment/config';
import { setSwagger } from './common/swagger/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setSwagger(app);
  app.enableCors({
    origin: [
      'https://todogochi.vercel.app',
      'http://localhost:3000',
      'http://localhost:13000',
    ],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(cookieParser());
  app.use(helmet());
  console.log('test');
  const port = Config.getEnvironment().PORT;
  await app.listen(port);
}
bootstrap();
