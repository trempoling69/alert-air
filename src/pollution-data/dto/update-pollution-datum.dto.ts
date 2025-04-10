import { PartialType } from '@nestjs/mapped-types';
import { CreatePollutionDatumDto } from './create-pollution-datum.dto';

export class UpdatePollutionDatumDto extends PartialType(CreatePollutionDatumDto) {}
