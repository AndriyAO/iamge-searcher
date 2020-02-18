import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('hc')
  get(): string {
    return 'helth check OK';
  }
}
