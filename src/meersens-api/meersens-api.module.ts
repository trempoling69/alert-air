import { Module } from '@nestjs/common';
import { MeersensApiService } from './meersens-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ timeout: 10000 })],
  providers: [MeersensApiService],
  exports: [MeersensApiService],
})
export class MeersensApiModule {}
