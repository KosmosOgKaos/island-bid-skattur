import { ApiProperty } from '@nestjs/swagger';
import { IncomeType, Currency } from '../types/enums';
import { PropertyType } from '../types/enums';
import { DebtType } from '../types/enums';

export class CreateIncomeDto {
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
}

export class CreatePropertyDto {
  @ApiProperty({
    description: 'The type of property',
    enum: PropertyType,
    enumName: 'PropertyType',
  })
  type: PropertyType;

  @ApiProperty({ description: 'The name or description of the property value' })
  valueName: string;

  @ApiProperty({ description: 'The monetary value of the property' })
  value: number;

  @ApiProperty({
    description: 'The currency of the property value',
    enum: Currency,
    enumName: 'Currency',
  })
  currency: Currency;

  @ApiProperty({
    description: 'Additional properties in JSON format',
    required: false,
  })
  properties?: Record<string, any>;
}

export class CreateDebtDto {
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
}

export class CreateSubmissionDto {
  @ApiProperty({
    description: 'List of incomes to be reported in this submission',
    type: [CreateIncomeDto],
  })
  incomes: CreateIncomeDto[];

  @ApiProperty({
    description: 'List of properties to be reported in this submission',
    type: [CreatePropertyDto],
  })
  properties: CreatePropertyDto[];

  @ApiProperty({
    description: 'List of debts to be reported in this submission',
    type: [CreateDebtDto],
  })
  debts: CreateDebtDto[];
}
