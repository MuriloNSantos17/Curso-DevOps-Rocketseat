import { Injectable } from '@nestjs/common';
import { log } from '../../infra/logger';

@Injectable()
export class UserService {
  list(): Array<{ email: string, name: string }> {
    log.info("Buscando usuários....");
    
    return [
      { email: 'murilo.santos@mlgw.com.br', name: 'murilo.santos' },
      { email: 'murilo.santos@mlgw2.com.br', name: 'murilo.santos2' }
    ]
  }
}
