import { ApiProperty } from '@nestjs/swagger';
import { IncomeType, Currency, PropertyType, DebtType } from '../types/enums';

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

export class BaseSubmissionDto {
  @ApiProperty({ description: 'The person associated with this submission' })
  person: PersonDto;
}

export class BaseIncomeDto {
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

export class BasePropertyDto {
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

export class BaseDebtDto {
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