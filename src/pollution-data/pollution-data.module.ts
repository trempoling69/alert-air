import { Module } from '@nestjs/common';
import { PollutionDataService } from './pollution-data.service';
import { PollutionDataController } from './pollution-data.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PollutionData } from './entities/pollution-data.entity';
import { GoogleApiModule } from 'src/google-api/google-api.module';

@Module({
  imports: [SequelizeModule.forFeature([PollutionData]), GoogleApiModule],
  controllers: [PollutionDataController],
  providers: [PollutionDataService],
  exports: [PollutionDataService],
})
export class PollutionDataModule {}
