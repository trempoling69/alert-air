import { Controller, Get, Query } from '@nestjs/common';
import { MeteoObservationLyonService } from './meteo-observation-lyon.service';

@Controller('meteo-observation-lyon')
export class MeteoObservationLyonController {
  constructor(
    private readonly meteoObservationLyonService: MeteoObservationLyonService,
  ) {}

  @Get()
  findAll(
    @Query('startDate') startDateParam: string | undefined,
    @Query('endDate') endDateParam: string | undefined,
  ) {
    const startDate = startDateParam ? new Date(startDateParam) : null;
    const endDate = endDateParam ? new Date(endDateParam) : null;
    return this.meteoObservationLyonService.findAll({ startDate, endDate });
  }
}
