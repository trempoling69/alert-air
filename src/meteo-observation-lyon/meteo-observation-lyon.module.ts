import { Module } from '@nestjs/common';
import { MeteoObservationLyonService } from './meteo-observation-lyon.service';
import { MeteoObservationLyonController } from './meteo-observation-lyon.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MeteoObservationLyon } from './entities/meteo-observation-lyon.entity';
import { GoogleApiModule } from 'src/google-api/google-api.module';

@Module({
  imports: [
    SequelizeModule.forFeature([MeteoObservationLyon]),
    GoogleApiModule,
  ],
  controllers: [MeteoObservationLyonController],
  providers: [MeteoObservationLyonService],
  exports: [MeteoObservationLyonService],
})
export class MeteoObservationLyonModule {}
