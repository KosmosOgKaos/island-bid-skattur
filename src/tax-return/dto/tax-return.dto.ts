import { ApiProperty } from '@nestjs/swagger';
import {
  BaseIncomeDto,
  BasePropertyDto,
  BaseDebtDto,
  BaseSubmissionDto,
} from './base.dto';

export class IncomeDto extends BaseIncomeDto {
  @ApiProperty({ description: 'The date when the income record was created' })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the income record was last updated',
  })
  updatedAt: Date;
}

export class PropertyDto extends BasePropertyDto {
  @ApiProperty({ description: 'The date when the property record was created' })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the property record was last updated',
  })
  updatedAt: Date;
}

export class DebtDto extends BaseDebtDto {
  @ApiProperty({ description: 'The date when the debt record was created' })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the debt record was last updated',
  })
  updatedAt: Date;
}

export class SubmissionDto extends BaseSubmissionDto {
  @ApiProperty({
    description: 'The status of the submission',
    enum: ['Imported', 'Submitted', 'Finished'],
  })
  status: 'Imported' | 'Submitted' | 'Finished';

  @ApiProperty({
    description: 'List of incomes reported in this submission',
    type: [IncomeDto],
  })
  incomes: IncomeDto[];

  @ApiProperty({
    description: 'List of properties reported in this submission',
    type: [PropertyDto],
  })
  properties: PropertyDto[];

  @ApiProperty({
    description: 'List of debts reported in this submission',
    type: [DebtDto],
  })
  debts: DebtDto[];

  @ApiProperty({ description: 'The date when the submission was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The date when the submission was last updated' })
  updatedAt: Date;
}
