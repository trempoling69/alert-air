import { Controller, Get, Query } from '@nestjs/common';
import { PollutionDataService } from './pollution-data.service';

@Controller('pollution-data')
export class PollutionDataController {
  constructor(private readonly pollutionDataService: PollutionDataService) {}

  @Get()
  findAll(
    @Query('startDate') startDateParam: string | undefined,
    @Query('endDate') endDateParam: string | undefined,
  ) {
    const startDate = startDateParam ? new Date(startDateParam) : null;
    const endDate = endDateParam ? new Date(endDateParam) : null;
    return this.pollutionDataService.findAll({ startDate, endDate });
  }
}
