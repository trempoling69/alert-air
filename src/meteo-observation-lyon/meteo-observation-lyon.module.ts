import { Module } from '@nestjs/common';
import { MeteoObservationLyonService } from './meteo-observation-lyon.service';
import { MeteoObservationLyonController } from './meteo-observation-lyon.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MeteoObservationLyon } from './entities/meteo-observation-lyon.entity';

@Module({
  imports: [SequelizeModule.forFeature([MeteoObservationLyon])],
  controllers: [MeteoObservationLyonController],
  providers: [MeteoObservationLyonService],
  exports: [MeteoObservationLyonService],
})
export class MeteoObservationLyonModule {}
