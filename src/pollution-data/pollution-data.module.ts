import { Module } from '@nestjs/common';
import { PollutionDataService } from './pollution-data.service';
import { PollutionDataController } from './pollution-data.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PollutionData } from './entities/pollution-data.entity';
import { AtmoApiServiceModule } from 'src/atmo-api-service/atmo-api-service.module';

@Module({
  imports: [SequelizeModule.forFeature([PollutionData]), AtmoApiServiceModule],
  controllers: [PollutionDataController],
  providers: [PollutionDataService],
  exports: [PollutionDataService],
})
export class PollutionDataModule {}
