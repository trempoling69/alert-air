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
  async fetchTodayMeteo() {
    try {
      return firstValueFrom(
        this.httpService.get(
          `https://weather.googleapis.com/v1/forecast/days:lookup?key=${this.configService.get('GOOGLE_API_KEY')}&location.longitude=4.820659&location.latitude=45.742648&days=1`,
        ),
      );
    } catch (err) {
      console.log(err);
      this.logger.error(`Failed to call google api`, err.message);
      throw new HttpException('Fail google', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async fetchAirQuality({ date }: { date: string }) {
  //   try {
  //     return firstValueFrom(
  //       this.httpService.get(
  //         `https://api.atmo-aura.fr/api/v1/communes/69123/indices/atmo?api_token=${this.configService.get('ATMO_API_KEY')}&date_calcul=${date}`,
  //       ),
  //     );
  //   } catch (err) {
  //     console.log(err);
  //     this.logger.error(`Failed to call google api`, err.message);
  //     throw new HttpException('Fail google', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // async parseAirQuality() {
  //   const data = await this.fetchAirQuality({ date: 'now' });
  //   const date = new Date();
  //   const polluants = data.data.data;

  //   return polluants.map((polluant) => {
  //     return {
  //       date,
  //       validation: data.data.success,
  //       type_appareil_label: 'Analyseur Air',
  //       valeur: polluant.indice,
  //       code_polluant: polluant.code,
  //       label_polluant: polluant.fullName,
  //       label_court_polluant: polluant.displayName,
  //       unite: UnitEnum[polluant.concentration.units],
  //       label_unite: polluant.concentration.units,
  //     };
  //   });
  // }

  async parseMeteoData() {
    const data = await this.fetchTodayMeteo();
    const date = new Date();
    const forecastDays = data.data.forecastDays;
    const bulletin = forecastDays.map((info) => {
      console.log(info);
      const precipitation_mm =
        info.daytimeForecast.precipitation.qpf.quantity +
        info.nighttimeForecast.precipitation.qpf.quantity;
      const wind =
        (info.daytimeForecast.wind.speed.value +
          info.nighttimeForecast.wind.speed.value) /
        2;
      return {
        date,
        precipitation_mm,
        temperature_min: info.minTemperature.degrees,
        temperature_max: info.maxTemperature.degrees,
        temperature_moy:
          (info.minTemperature.degrees + info.maxTemperature.degrees) / 2,
        vent_moyen: wind,
      };
    });
    return bulletin;
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
