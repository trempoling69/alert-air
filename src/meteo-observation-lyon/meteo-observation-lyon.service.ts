import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MeteoObservationLyon } from './entities/meteo-observation-lyon.entity';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleApiService } from 'src/google-api/google-api.service';

@Injectable()
export class MeteoObservationLyonService {
  constructor(
    @InjectModel(MeteoObservationLyon)
    private readonly meteoObservationLyonModel: typeof MeteoObservationLyon,
    private readonly googleApiService: GoogleApiService,
  ) {}

  findAll(params?: { startDate: Date | null; endDate: Date | null }) {
    const whereClause: WhereOptions<MeteoObservationLyon> = {};
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
    return this.meteoObservationLyonModel.findAll({ where: whereClause });
  }

  async populateDev() {
    const arrayOfData = await this.googleApiService.parseMeteoData();
    return this.meteoObservationLyonModel.bulkCreate(arrayOfData);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async populateMeteo() {
    const arrayOfData = await this.googleApiService.parseMeteoData();
    await this.meteoObservationLyonModel.bulkCreate(arrayOfData);
  }
}
