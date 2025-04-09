import { Injectable } from '@nestjs/common';
import { CreatePollenBulletinDto } from './dto/create-pollen-bulletin.dto';
import { UpdatePollenBulletinDto } from './dto/update-pollen-bulletin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PollenBulletin } from './entities/pollen-bulletin.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleApiService } from 'src/google-api/google-api.service';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class PollenBulletinService {
  constructor(
    @InjectModel(PollenBulletin)
    private readonly pollenBulletinModel: typeof PollenBulletin,
    private readonly googleApiService: GoogleApiService,
  ) {}

  create(createPollenBulletinDto: CreatePollenBulletinDto) {
    return this.pollenBulletinModel.create(createPollenBulletinDto);
  }

  findAll(params?: {
    startDate: Date | null;
    endDate: Date | null;
    designation: string;
  }) {
    const whereClause: WhereOptions<PollenBulletin> = {};
    if (params) {
      if (params.designation) {
        whereClause.designation = { [Op.eq]: params.designation };
      }
      if (params.startDate && params.endDate) {
        whereClause.bulletin_date = {
          [Op.gte]: params.startDate,
          [Op.lte]: params.endDate,
        };
      } else if (params.startDate) {
        whereClause.bulletin_date = { [Op.gte]: params.startDate };
      } else if (params.endDate) {
        whereClause.bulletin_date = { [Op.lte]: params.endDate };
      }
    }

    return this.pollenBulletinModel.findAll({ where: whereClause });
  }

  findOne(id: number) {
    return `This action returns a #${id} pollenBulletin`;
  }

  update(id: number, updatePollenBulletinDto: UpdatePollenBulletinDto) {
    return `This action updates a #${id} pollenBulletin`;
  }

  remove(id: number) {
    return `This action removes a #${id} pollenBulletin`;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async populateNewBulletin() {
    const arrayOfData = await this.googleApiService.parseData();
    await this.pollenBulletinModel.bulkCreate(arrayOfData);
  }
}
