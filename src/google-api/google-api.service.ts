import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PlantEnum } from './enum/plantEnum';

@Injectable()
export class GoogleApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(GoogleApiService.name);

  async fetchTodayData() {
    try {
      return firstValueFrom(
        this.httpService.get(
          `https://pollen.googleapis.com/v1/forecast:lookup?key=${this.configService.get('GOOGLE_API_KEY')}&location.longitude=4.820659&location.latitude=45.742648&days=1`,
        ),
      );
    } catch (err) {
      console.log(err);
      this.logger.error(`Failed to call google api`, err.message);
      throw new HttpException('Fail google', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async parseData() {
    const data = await this.fetchTodayData();
    const bulletin_date = new Date();
    const pollenInfo = data.data.dailyInfo[0].plantInfo;
    const bulletin = pollenInfo.map((info) => {
      return {
        bulletin_date,
        station: 'Google Api',
        designation: PlantEnum[info.code],
        nom_latin: info.plantDescription
          ? info.plantDescription.family.split(' ')[0]
          : null,
        quantite: null,
        raep: info.indexInfo ? info.indexInfo.value : 0,
        type: null,
      };
    });

    return bulletin;
  }
}
