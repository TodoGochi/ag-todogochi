import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './common/environment/config';
import { setSwagger } from './common/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setSwagger(app);

  const port = Config.getEnvironment().PORT;
  await app.listen(port);
}
bootstrap();
