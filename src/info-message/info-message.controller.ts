import { Controller, Get } from '@nestjs/common';
import { InfoMessageService } from './info-message.service';

@Controller('info-message')
export class InfoMessageController {
  constructor(private readonly infoMessageService: InfoMessageService) {}

  @Get()
  getMessageOfTheDay() {
    return this.infoMessageService.getMessageOfDay();
  }
}
