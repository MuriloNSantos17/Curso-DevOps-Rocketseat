import { Injectable } from '@nestjs/common';
import { request } from 'undici';
import { log } from '../../infra/logger';

interface ResponseEmailProps { email: string, name: string }

@Injectable()
export class UserService {
  async list(): Promise<any> {
    const { body } = await request('http://localhost:3002/users');

    const payload = await body.json();

    log.info(`${JSON.stringify(payload)}`)

    return payload;
  }
}
