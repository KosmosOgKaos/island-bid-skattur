import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
  getHello(): string {
    return 'Hello World!';
  }

  getFakeStringData(): string {
    return Math.random().toString(36).substring(2);
  }

  capitalize(input: string): string {
    return `${input.at(0)?.toUpperCase()}${input.substring(1)}`;
  }
}
