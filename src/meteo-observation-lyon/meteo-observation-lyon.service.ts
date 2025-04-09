import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MeteoObservationLyon } from './entities/meteo-observation-lyon.entity';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class MeteoObservationLyonService {
  constructor(
    @InjectModel(MeteoObservationLyon)
    private readonly meteoObservationLyonModel: typeof MeteoObservationLyon,
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
}
