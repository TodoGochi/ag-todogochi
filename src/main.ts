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
      'http://localhost:13000',
      'http://localhost:3000',
      'https://todogochi-helloworlddogs223s-projects.vercel.app/',
      'https://todogochi.vercel.app/',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  app.use(helmet());

  const port = Config.getEnvironment().PORT;
  await app.listen(port);
}
bootstrap();
