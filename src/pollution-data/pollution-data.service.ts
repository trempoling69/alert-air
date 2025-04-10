import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PollutionData } from './entities/pollution-data.entity';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleApiService } from 'src/google-api/google-api.service';

@Injectable()
export class PollutionDataService {
  constructor(
    @InjectModel(PollutionData)
    private readonly pollutionDataModel: typeof PollutionData,
    private readonly googleApiService: GoogleApiService,
  ) {}

  findAll(params?: { startDate: Date | null; endDate: Date | null }) {
    const whereClause: WhereOptions<PollutionData> = {};
    if (params) {
      if (params.startDate && params.endDate) {
        whereClause.date = {
          [Op.gte]: params.startDate,
          [Op.lte]: params.endDate,
        };
      } else if (params.startDate) {
        whereClause.date = { [Op.gte]: params.startDate };
      } else if (params.endDate) {
        whereClause.date = { [Op.lte]: params.endDate };
      }
    }
    return this.pollutionDataModel.findAll({ where: whereClause });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async populateNewBulletin() {
    const arrayOfData = await this.googleApiService.parseAirQuality();
    await this.pollutionDataModel.bulkCreate(arrayOfData);
  }
}
