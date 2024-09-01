import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './provider/server/server.module';
import { HttpExceptionFilter } from './common/core/filters/http-exception.filter';
import { UserModule } from './user/user.module';

@Module({
  imports: [ServerModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
