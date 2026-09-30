import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/metric-test')
  metricTest(): string {
    return this.appService.metricTest();
  }

  @Get('/example-k8s')
  getExample(): string {
    return this.appService.getExample();
  }
}
