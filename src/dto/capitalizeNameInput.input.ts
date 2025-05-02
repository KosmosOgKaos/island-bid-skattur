import { ApiProperty } from '@nestjs/swagger';

export class CapitalizeNameInput {
  @ApiProperty({
    minLength: 2,
  })
  name: string;
}
