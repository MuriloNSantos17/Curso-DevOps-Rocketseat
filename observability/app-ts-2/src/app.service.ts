import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { log } from './infra/logger';
import { metrics } from './tracer';
@Injectable()
export class AppService {
  getHello(): string {
    log.info('Cheguei aqui')
    const metric = metrics.getMeter('app-rockeseat')
    const successMetric = metric.createCounter('hello_success')
    successMetric.add(1);

    return 'Hello World!';
  }

  metricTest(): string {
    const metric = metrics.getMeter('app-rockeseat')
    const errorMetric = metric.createCounter('hello_error')
    errorMetric.add(1);

    const histogram = metric.createHistogram('request_duration')
    histogram.record(1000);

    return 'Métrica adicionada';
  }

  getExample(): string {
    const file = createWriteStream('/tmp/rocketseat.txt');
    for (let x = 0; x < 10000; x++) {
      file.write('Estou escrevendo em um arquivo\n');
    }
    return 'Estou rodando no K8S';
  }
}
