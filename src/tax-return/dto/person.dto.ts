import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty({ description: 'The unique identifier of the person' })
  id: number;

  @ApiProperty({ description: 'The name of the person' })
  name: string;

  @ApiProperty({ description: 'The Icelandic national ID number (kennitala)' })
  kennitala: string;

  @ApiProperty({ description: 'The address of the person' })
  address: string;

  @ApiProperty({ description: 'The email address of the person' })
  email: string;

  @ApiProperty({
    description: 'The telephone number of the person',
    required: false,
  })
  telephone?: string;

  @ApiProperty({ description: 'The date when the person record was created' })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the person record was last updated',
  })
  updatedAt: Date;
} 