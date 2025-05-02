import { ApiProperty } from '@nestjs/swagger';

export class CapitalizeInput {
  @ApiProperty({
    minLength: 2,
  })
  input: string;
}
