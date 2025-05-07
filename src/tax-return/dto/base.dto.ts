import { ApiProperty } from '@nestjs/swagger';
import { IncomeType, Currency, PropertyType, DebtType } from '../types/enums';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsPositive,
  IsDate,
  IsObject,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class BaseSubmissionDto {
  @ApiProperty({
    description: 'The unique identifier of the submission',
  })
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty({
    description: 'The SSN of the person to whom this submission belongs',
  })
  ssn: string;
}

export class BaseIncomeDto {
  @ApiProperty({
    description: 'The unique identifier of the income record',
  })
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty({
    description: 'The type of income',
    enum: IncomeType,
    enumName: 'IncomeType',
  })
  @IsEnum(IncomeType)
  type: IncomeType;

  @ApiProperty({
    description: 'The name of the payer',
    required: false,
  })
  @IsOptional()
  @IsString()
  payer?: string;

  @ApiProperty({ description: 'The amount of income' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'The currency of the income',
    enum: Currency,
    enumName: 'Currency',
  })
  @IsEnum(Currency)
  currency: Currency;

  @ApiProperty({
    description: 'Additional explanation about the income',
    required: false,
  })
  @IsOptional()
  @IsString()
  explanation?: string;
}

export class BasePropertyDto {
  @ApiProperty({
    description: 'The unique identifier of the property record',
  })
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty({
    description: 'The type of property',
    enum: PropertyType,
    enumName: 'PropertyType',
  })
  @IsEnum(PropertyType)
  type: PropertyType;

  @ApiProperty({ description: 'The name or description of the property value' })
  @IsString()
  @MinLength(2)
  valueName: string;

  @ApiProperty({ description: 'The monetary value of the property' })
  @IsNumber()
  @IsPositive()
  value: number;

  @ApiProperty({
    description: 'The currency of the property value',
    enum: Currency,
    enumName: 'Currency',
  })
  @IsEnum(Currency)
  currency: Currency;

  @ApiProperty({
    description: 'Additional properties in JSON format',
    required: false,
  })
  @IsOptional()
  @IsObject()
  properties?: Record<string, any>;
}

export class BaseDebtDto {
  @ApiProperty({
    description: 'The unique identifier of the debt record',
  })
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty({
    description: 'Description of the debt',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The type of debt',
    enum: DebtType,
    enumName: 'DebtType',
  })
  @IsEnum(DebtType)
  type: DebtType;

  @ApiProperty({
    description: 'The currency of the debt',
    enum: Currency,
    enumName: 'Currency',
  })
  @IsEnum(Currency)
  currency: Currency;

  @ApiProperty({
    description: 'The name of the creditor',
    required: false,
  })
  @IsOptional()
  @IsString()
  creditor?: string;

  @ApiProperty({
    description: 'The national ID number of the creditor',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'Invalid kennitala format. Must be in format XXXXXXXXXX',
  })
  creditorKennitala?: string;

  @ApiProperty({
    description: 'The loan number',
    required: false,
  })
  @IsOptional()
  @IsString()
  loanNumber?: string;

  @ApiProperty({
    description: 'The start date of the loan',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  loanStartDate?: Date;

  @ApiProperty({
    description: 'The duration of the loan in years',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  loanDurationYears?: number;

  @ApiProperty({
    description: 'Total yearly payment amount',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  yearPaymentTotal?: number;

  @ApiProperty({
    description: 'Total nominal payment amount',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  nominalPaymentTotal?: number;

  @ApiProperty({ description: 'Total interest payment amount' })
  @IsNumber()
  interestPaymentTotal: number;

  @ApiProperty({ description: 'Remaining debt amount' })
  @IsNumber()
  remaining: number;

  @ApiProperty({
    description: 'Additional properties in JSON format',
    required: false,
  })
  @IsOptional()
  @IsObject()
  properties?: Record<string, any>;
}
