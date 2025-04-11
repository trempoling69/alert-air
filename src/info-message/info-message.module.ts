import { Module } from '@nestjs/common';
import { InfoMessageService } from './info-message.service';
import { InfoMessageController } from './info-message.controller';
import { HttpModule } from '@nestjs/axios';
import { MeteoObservationLyonModule } from 'src/meteo-observation-lyon/meteo-observation-lyon.module';
import { PollenBulletinModule } from 'src/pollen-bulletin/pollen-bulletin.module';

@Module({
  imports: [
    HttpModule.register({ timeout: 10000 }),
    MeteoObservationLyonModule,
    PollenBulletinModule,
  ],
  controllers: [InfoMessageController],
  providers: [InfoMessageService],
  exports: [InfoMessageService],
})
export class InfoMessageModule {}
