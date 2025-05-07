import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import {
  BaseSubmissionDto,
  BaseIncomeDto,
  BasePropertyDto,
  BaseDebtDto,
} from './base.dto';

export class IncomeResponseDto extends BaseIncomeDto {
  @ApiProperty({
    description: 'The unique identifier of the income record',
  })
  @IsNumber()
  @IsPositive()
  id: number;
}

export class PropertyResponseDto extends BasePropertyDto {
  @ApiProperty({
    description: 'The unique identifier of the property record',
  })
  @IsNumber()
  @IsPositive()
  id: number;
}

export class DebtResponseDto extends BaseDebtDto {
  @ApiProperty({
    description: 'The unique identifier of the debt record',
  })
  @IsNumber()
  @IsPositive()
  id: number;
}

export class SubmissionResponseDto extends BaseSubmissionDto {
  @ApiProperty({
    description: 'The unique identifier of the submission',
  })
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty({
    description: 'The status of the submission',
    enum: ['Imported', 'Submitted', 'Finished'],
  })
  status: 'Imported' | 'Submitted' | 'Finished';

  @ApiProperty({
    description: 'List of incomes reported in this submission',
    type: [IncomeResponseDto],
  })
  incomes: IncomeResponseDto[];

  @ApiProperty({
    description: 'List of properties reported in this submission',
    type: [PropertyResponseDto],
  })
  properties: PropertyResponseDto[];

  @ApiProperty({
    description: 'List of debts reported in this submission',
    type: [DebtResponseDto],
  })
  debts: DebtResponseDto[];
} 