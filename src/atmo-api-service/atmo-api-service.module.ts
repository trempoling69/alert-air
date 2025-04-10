import { Module } from '@nestjs/common';
import { AtmoApiServiceService } from './atmo-api-service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ timeout: 10000 })],
  providers: [AtmoApiServiceService],
  exports: [AtmoApiServiceService],
})
export class AtmoApiServiceModule {}
