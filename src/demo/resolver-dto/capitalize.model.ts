import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CapitalizeInput {
  @Field({ nullable: false })
  input!: string;
}
