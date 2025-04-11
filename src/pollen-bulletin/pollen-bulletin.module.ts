import { Module } from '@nestjs/common';
import { PollenBulletinService } from './pollen-bulletin.service';
import { PollenBulletinController } from './pollen-bulletin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PollenBulletin } from './entities/pollen-bulletin.entity';
import { MeersensApiModule } from 'src/meersens-api/meersens-api.module';
@Module({
  imports: [SequelizeModule.forFeature([PollenBulletin]), MeersensApiModule],
  controllers: [PollenBulletinController],
  providers: [PollenBulletinService],
  exports: [PollenBulletinService],
})
export class PollenBulletinModule {}
