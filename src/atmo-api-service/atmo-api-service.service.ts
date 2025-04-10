import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AtmoMesure, AtmoSite } from './type';

@Injectable()
export class AtmoApiServiceService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AtmoApiServiceService.name);

  async fetchAllSite({ department }: { department: number }) {
    try {
      return firstValueFrom(
        this.httpService.get(
          `https://api.atmo-aura.fr/api/v1/sites?api_token=${this.configService.get('ATMO_API_KEY')}&format=json&typologie=Urbain&departements=${department}&en_service=1`,
        ),
      );
    } catch (err) {
      console.log(err);
      this.logger.error(`Failed to fetch atmo sites`, err.message);
      throw new HttpException('Fail atmo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async parseAtmoSite(): Promise<AtmoSite[]> {
    const siteQuery = await this.fetchAllSite({ department: 69 });
    const allSites = siteQuery.data.data;

    return allSites.map((site) => {
      return {
        label: site.label,
        id: site.id,
      };
    });
  }

  async fetchAllMesure(date?: string) {
    const allSite = await this.parseAtmoSite();
    const sitesString = allSite.map((site) => site.id).join(',');
    const dateString = date ? `&date_debut=${date}` : '';
    try {
      return firstValueFrom(
        this.httpService.get(
          `https://api.atmo-aura.fr/api/v1/valeurs/journaliere?api_token=${this.configService.get('ATMO_API_KEY')}&sites=${sitesString}&format=json` +
            dateString,
        ),
      );
    } catch (err) {
      console.log(err);
      this.logger.error(`Failed to fetch atmo mesures`, err.message);
      throw new HttpException('Fail atmo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async parseAllMesure(date?: string): Promise<AtmoMesure[]> {
    const mesureQuery = await this.fetchAllMesure(date);
    const allMesures = mesureQuery.data.data;
    return allMesures.map((mesure) => {
      return {
        date: new Date(mesure.date),
        valeur: mesure.valeur,
        validation: mesure.validation,
        site_id: mesure.site_id,
        site_label: mesure.site_label,
        type_appareil_label: mesure.type_appareil_label,
        code_polluant: mesure.code_polluant,
        label_polluant: mesure.label_polluant,
        label_court_polluant: mesure.label_court_polluant,
        unite: mesure.unite,
        label_unite: mesure.label_unite,
      };
    });
  }

  async fetchAirQualityIndice(date?: string) {
    try {
      const dateString = date ? `&date_echeance=${date}` : '';
      return firstValueFrom(
        this.httpService.get(
          `https://api.atmo-aura.fr/api/v1/communes/69123/indices/atmo?api_token=${this.configService.get('ATMO_API_KEY')}` +
            dateString,
        ),
      );
    } catch (err) {
      console.log(err);
      this.logger.error(`Failed to fetch atmo air indice`, err.message);
      throw new HttpException('Fail google', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async parseAirQualityIndice(date?: string) {
    const airQualityRequest = await this.fetchAirQualityIndice(date);
    const polluants = airQualityRequest.data.data;

    return polluants.map((polluant) => {
      return {
        date: new Date(polluant.date_echeance),
        valeur: polluant.indice,
        validation: airQualityRequest.data.success,
        site_id: polluant.commune_insee,
        site_label: polluant.commune_nom,
        type_appareil_label: null,
        code_polluant: 'INDICE',
        label_polluant: null,
        label_court_polluant: null,
        unite: null,
        label_unite: null,
      };
    });
  }

  async fetchByDayAir() {
    const indiceDate = new Date().toISOString();
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const mesureDate = new Date(yesterday).toISOString();
    const indiceOfDay = await this.parseAirQualityIndice(indiceDate);
    const mesureOfDay = await this.parseAllMesure(mesureDate);

    return [...mesureOfDay, ...indiceOfDay];
  }
}
