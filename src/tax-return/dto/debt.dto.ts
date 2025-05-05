import { ApiProperty } from '@nestjs/swagger';
import { DebtType, Currency } from '../types/enums';

export class DebtDto {
  @ApiProperty({ description: 'The unique identifier of the debt record' })
  id: number;

  @ApiProperty({
    description: 'Description of the debt',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The type of debt',
    enum: DebtType,
    enumName: 'DebtType',
  })
  type: DebtType;

  @ApiProperty({
    description: 'The currency of the debt',
    enum: Currency,
    enumName: 'Currency',
  })
  currency: Currency;

  @ApiProperty({
    description: 'The name of the creditor',
    required: false,
  })
  creditor?: string;

  @ApiProperty({
    description: 'The national ID number of the creditor',
    required: false,
  })
  creditorKennitala?: string;

  @ApiProperty({
    description: 'The loan number',
    required: false,
  })
  loanNumber?: string;

  @ApiProperty({
    description: 'The start date of the loan',
    required: false,
  })
  loanStartDate?: Date;

  @ApiProperty({
    description: 'The duration of the loan in years',
    required: false,
  })
  loanDurationYears?: number;

  @ApiProperty({
    description: 'Total yearly payment amount',
    required: false,
  })
  yearPaymentTotal?: number;

  @ApiProperty({
    description: 'Total nominal payment amount',
    required: false,
  })
  nominalPaymentTotal?: number;

  @ApiProperty({ description: 'Total interest payment amount' })
  interestPaymentTotal: number;

  @ApiProperty({ description: 'Remaining debt amount' })
  remaining: number;

  @ApiProperty({
    description: 'Additional properties in JSON format',
    required: false,
  })
  properties?: Record<string, any>;

  @ApiProperty({ description: 'The date when the debt record was created' })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the debt record was last updated',
  })
  updatedAt: Date;
}
