import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { MeteoObservationLyonService } from 'src/meteo-observation-lyon/meteo-observation-lyon.service';
import { PollenBulletinService } from 'src/pollen-bulletin/pollen-bulletin.service';

@Injectable()
export class InfoMessageService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly meteoObservationService: MeteoObservationLyonService,
    private readonly pollenBulletinService: PollenBulletinService,
  ) {}

  private readonly logger = new Logger(InfoMessageService.name);

  async fetchMessageDay() {
    try {
      const meteoData = await this.meteoObservationService.findAll({
        startDate: new Date(new Date().toISOString().split('T')[0]),
        endDate: null,
      });
      const meteoOfDay = meteoData[0];
      const pollenData = await this.pollenBulletinService.findAll({
        startDate: new Date(new Date().toISOString().split('T')[0]),
        endDate: null,
        designation: null,
      });

      const meteoToUse = pollenData.map((pollen) => ({
        designation: pollen.designation,
        quantite: parseFloat(pollen.quantite),
        vent_moyen: meteoOfDay ? meteoOfDay.vent_moyen : 0,
        precipitation_mm: meteoOfDay ? meteoOfDay.precipitation_mm : 0,
        temperature_moy: meteoOfDay
          ? Math.floor(meteoOfDay.temperature_moy)
          : 0,
      }));

      const requests = meteoToUse.map((item) => {
        const body = {
          features: {
            designation: item.designation,
            vent_moyen: item.vent_moyen,
            precipitation_mm: item.precipitation_mm,
            quantite: item.quantite,
            temperature_moy: item.temperature_moy,
          },
        };

        return firstValueFrom(
          this.httpService.post(
            'https://api-ecdf8fef-9535616f-dku.eu-west-3.app.dataiku.io/public/api/v1/1/1/run',
            body,
            {
              headers: {
                Authorization: `Bearer ${this.configService.get('PERSONAL_API_KEY')}`,
              },
            },
          ),
        );
      });

      const results = await Promise.all(requests);

      return results;
    } catch (err) {
      console.log(err);
      this.logger.error(`Failed to fetch personnal api`, err.message);
      throw new HttpException('Fail api', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMessageOfDay() {
    const messageQuery = await this.fetchMessageDay();
    const messages = messageQuery.map((request) => {
      return request.data.response;
    });
    return messages;
  }
}
