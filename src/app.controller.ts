import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MeteoObservationLyonService } from './meteo-observation-lyon/meteo-observation-lyon.service';
import { PollenBulletinService } from './pollen-bulletin/pollen-bulletin.service';
import { PollutionDataService } from './pollution-data/pollution-data.service';
import { AtmoApiServiceService } from './atmo-api-service/atmo-api-service.service';
import { MeersensApiService } from './meersens-api/meersens-api.service';
import { InfoMessageService } from './info-message/info-message.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly meteoService: MeteoObservationLyonService,
    private readonly pollenService: PollenBulletinService,
    private readonly pollutionService: PollutionDataService,
    private readonly atmosService: AtmoApiServiceService,
    private readonly meersensService: MeersensApiService,
    private readonly messageService: InfoMessageService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('meteo')
  // populateMeteo() {
  //   return this.meteoService.populateDev();
  // }
  // @Get('pollution')
  // populatePollution() {
  //   return this.pollutionService.populateDev();
  // }
  // @Get('pollen')
  // populatePollen() {
  //   return this.pollenService.populateDev();
  // }
  // @Get('atmo')
  // seeAtmo() {
  //   return this.atmosService.fetchByDayAir();
  // }
  // @Get('mersens')
  // seeMeersens() {
  //   return this.meersensService.parsePollen();
  // }
  // @Get('message')
  // seeMessage() {
  //   return this.messageService.getMessageOfDay();
  // }
}
