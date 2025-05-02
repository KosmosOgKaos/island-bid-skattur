import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CapitalizeNameInput } from './dto/capitalizeNameInput.input';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/randomString')
  getFakeStringData(): string {
    return this.appService.getFakeStringData();
  }

  @Post('/capitalizeName')
  postCapitalizeName(@Body() capitalizeNameInput: CapitalizeNameInput): string {
    const { name } = capitalizeNameInput;
    return `${name.at(0)?.toUpperCase()}${name.substring(1)}`;
  }
}
