import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { PollenBulletinModule } from './pollen-bulletin/pollen-bulletin.module';
import { GoogleApiModule } from './google-api/google-api.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MeteoObservationLyonModule } from './meteo-observation-lyon/meteo-observation-lyon.module';
import { PollutionDataModule } from './pollution-data/pollution-data.module';
import { AtmoApiServiceModule } from './atmo-api-service/atmo-api-service.module';
import { InfoMessageModule } from './info-message/info-message.module';
import { MeersensApiModule } from './meersens-api/meersens-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 150,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 300,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 500,
      },
    ]),
    ScheduleModule.forRoot(),
    DatabaseModule,
    PollenBulletinModule,
    GoogleApiModule,
    MeteoObservationLyonModule,
    PollutionDataModule,
    AtmoApiServiceModule,
    InfoMessageModule,
    MeersensApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
