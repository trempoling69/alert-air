import { PartialType } from '@nestjs/mapped-types';
import { CreateMeteoObservationLyonDto } from './create-meteo-observation-lyon.dto';

export class UpdateMeteoObservationLyonDto extends PartialType(CreateMeteoObservationLyonDto) {}
