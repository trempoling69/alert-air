import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { PollenBulletin } from 'src/pollen-bulletin/entities/pollen-bulletin.entity';

export default (configService: ConfigService): SequelizeModuleOptions => {
  return {
    dialect:
      (configService.get('DB_DIALECT') as Dialect | undefined) || 'postgres',
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT')!, 10) || 3306,
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    models: [PollenBulletin],
    autoLoadModels: true,
    synchronize: false,
  };
};
