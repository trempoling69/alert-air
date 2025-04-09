import { Controller, Get, Query } from '@nestjs/common';
import { PollenBulletinService } from './pollen-bulletin.service';
import { PlantEnum } from 'src/google-api/enum/plantEnum';
import { ResponseMessage } from 'src/decorator/response.message.decorator';

@Controller('pollen-bulletin')
export class PollenBulletinController {
  constructor(private readonly pollenBulletinService: PollenBulletinService) {}

  @Get()
  @ResponseMessage('Get all bulletin data')
  findAll(
    @Query('startDate') startDateParam: string | undefined,
    @Query('endDate') endDateParam: string | undefined,
    @Query('designation') designationParam: string | undefined,
  ) {
    const startDate = startDateParam ? new Date(startDateParam) : null;
    const endDate = endDateParam ? new Date(endDateParam) : null;
    const designation = designationParam ? PlantEnum[designationParam] : null;
    console.log(designation);
    console.log(designationParam);

    return this.pollenBulletinService.findAll({
      startDate,
      endDate,
      designation,
    });
  }
}
