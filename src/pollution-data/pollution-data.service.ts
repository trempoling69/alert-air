import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PollutionData } from './entities/pollution-data.entity';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AtmoApiServiceService } from 'src/atmo-api-service/atmo-api-service.service';

@Injectable()
export class PollutionDataService {
  constructor(
    @InjectModel(PollutionData)
    private readonly pollutionDataModel: typeof PollutionData,
    private readonly atmoService: AtmoApiServiceService,
  ) {}

  findAll(params?: {
    startDate: Date | null;
    endDate: Date | null;
    type: string | null;
  }) {
    const whereClause: WhereOptions<PollutionData> = {};
    if (params) {
      if (params.type) {
        if (params.type === 'POLLUANT') {
          whereClause.code_polluant = { [Op.ne]: 'INDICE' };
        } else {
          whereClause.code_polluant = { [Op.eq]: params.type };
        }
      }
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

  // async populateDev() {
  //   const arrayOfData = await this.atmoService.fetchByDayAir();
  //   return this.pollutionDataModel.bulkCreate(arrayOfData);
  // }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async populateNewBulletin() {
    const arrayOfData = await this.atmoService.fetchByDayAir();
    await this.pollutionDataModel.bulkCreate(arrayOfData);
  }
}
