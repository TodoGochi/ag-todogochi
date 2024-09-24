import { Module } from '@nestjs/common';
import { TamagotchiService } from './tamagotchi.service';
import { TamagotchiController } from './tamagotchi.controller';
import { ServerModule } from 'src/provider/server/server.module';

@Module({
  imports: [ServerModule],
  providers: [TamagotchiService],
  controllers: [TamagotchiController],
})
export class TamagotchiModule {}
