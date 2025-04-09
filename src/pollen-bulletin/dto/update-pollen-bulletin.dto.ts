import { PartialType } from '@nestjs/mapped-types';
import { CreatePollenBulletinDto } from './create-pollen-bulletin.dto';

export class UpdatePollenBulletinDto extends PartialType(CreatePollenBulletinDto) {}
