import { ApiProperty } from '@nestjs/swagger';
import { IncomeType, Currency } from '../types/enums';

export class IncomeDto {
  @ApiProperty({ description: 'The unique identifier of the income record' })
  id: number;

  @ApiProperty({
    description: 'The type of income',
    enum: IncomeType,
    enumName: 'IncomeType',
  })
  type: IncomeType;

  @ApiProperty({
    description: 'The name of the payer',
    required: false,
  })
  payer?: string;

  @ApiProperty({ description: 'The amount of income' })
  amount: number;

  @ApiProperty({
    description: 'The currency of the income',
    enum: Currency,
    enumName: 'Currency',
  })
  currency: Currency;

  @ApiProperty({
    description: 'Additional explanation about the income',
    required: false,
  })
  explanation?: string;

  @ApiProperty({ description: 'The date when the income record was created' })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the income record was last updated',
  })
  updatedAt: Date;
}
