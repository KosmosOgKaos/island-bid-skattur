import { ApiProperty } from '@nestjs/swagger';
import {
  BaseIncomeDto,
  BasePropertyDto,
  BaseDebtDto,
  BaseSubmissionDto,
} from './base.dto';

export class CreateIncomeDto extends BaseIncomeDto {}
export class CreatePropertyDto extends BasePropertyDto {}
export class CreateDebtDto extends BaseDebtDto {}

export class CreateSubmissionDto extends BaseSubmissionDto {
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
