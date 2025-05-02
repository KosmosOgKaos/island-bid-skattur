import { Args, Query, Resolver } from '@nestjs/graphql';
import { DemoService } from './demo.service';
import { CapitalizeInput } from './resolver-dto/capitalize.model';

@Resolver()
export class DemoResolver {
  constructor(private readonly demoService: DemoService) {}

  @Query(() => String)
  getHello(): string {
    return this.demoService.getHello();
  }

  @Query(() => String)
  getRandomString(): string {
    return this.demoService.getFakeStringData();
  }

  @Query(() => String)
  capitalize(@Args('input') input: CapitalizeInput): string {
    return this.demoService.capitalize(input.input);
  }
}
