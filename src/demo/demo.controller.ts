import { Body, Controller, Get, Post } from '@nestjs/common';
import { CapitalizeInput } from './api-dto/capitalize.input';
import { DemoService } from './demo.service';

@Controller('/api')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  getHello(): string {
    return this.demoService.getHello();
  }

  @Get('/randomString')
  getFakeStringData(): string {
    return this.demoService.getFakeStringData();
  }

  @Post('/capitalize')
  postCapitalizeName(@Body() capitalizeNameInput: CapitalizeInput): string {
    const { input } = capitalizeNameInput;
    return this.demoService.capitalize(input);
  }
}
