import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { log } from './infra/logger';
@Injectable()
export class AppService {
  getHello(): string {
    log.info(
      { 'http.request.method': 'GET', 'http.route': '/' },
      'Requisição GET / recebida',
    );
    console.log("ConfigMap", process.env.APP)
    console.log("Secret", process.env.API_KEY)
    return 'Hello World!';
  }

  getExample(): string {
    const file = createWriteStream('/tmp/rocketseat.txt');
    for (let x = 0; x < 10000; x++) {
      file.write('Estou escrevendo em um arquivo\n');
    }
    return 'Estou rodando no K8S';
  }
}
