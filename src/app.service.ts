import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getFakeStringData(): string {
    return Math.random().toString(36).substring(2);
  }
}
