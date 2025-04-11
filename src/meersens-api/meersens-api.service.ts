import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MeersensApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(MeersensApiService.name);

  fetchPollenDay() {
    try {
      return firstValueFrom(
        this.httpService.get(
          `https://api.meersens.com/environment/public/pollen/current?lat=45.742648&lng=4.820659&index_type=meersens&health_recommendations=false`,
          { headers: { apiKey: this.configService.get('MEERSENS_API_KEY') } },
        ),
      );
    } catch (err) {
      console.log(err);
      this.logger.error(`Failed to fetch meersens api`, err.message);
      throw new HttpException(
        'Fail meersens',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async parsePollen() {
    const data = await this.fetchPollenDay();
    const allPollens = data.data.pollutants;
    console.log(data.data);
    const arrayOfPollens = Object.entries(allPollens).map(
      ([_code_polluant, data]: [any, any]) => ({
        bulletin_date: new Date(),
        designation: data.name,
        quantite: data.value,
      }),
    );
    return arrayOfPollens;
  }
}
