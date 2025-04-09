import { Module } from '@nestjs/common';
import { PollenBulletinService } from './pollen-bulletin.service';
import { PollenBulletinController } from './pollen-bulletin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PollenBulletin } from './entities/pollen-bulletin.entity';
import { GoogleApiModule } from 'src/google-api/google-api.module';

@Module({
  imports: [SequelizeModule.forFeature([PollenBulletin]), GoogleApiModule],
  controllers: [PollenBulletinController],
  providers: [PollenBulletinService],
  exports: [PollenBulletinService],
})
export class PollenBulletinModule {}
