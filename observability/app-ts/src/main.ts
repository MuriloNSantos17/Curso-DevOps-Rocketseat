import { sdk } from './tracer';

sdk.start();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from './infra/logger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001).then(() => {
    log.info('Aplicação subiu uhul')
  }).catch((err) => {
    log.error(`Aplicação não subiu ${err}`)
  });
}

bootstrap();
