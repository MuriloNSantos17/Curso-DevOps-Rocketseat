import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth(): string {
    console.log('chequei a saúde da aplicação')
    return "OK";
  }

  checkReady(): string {
    console.log('chequei a prontidão da aplicação')
    return 'OK!';
  }
}
