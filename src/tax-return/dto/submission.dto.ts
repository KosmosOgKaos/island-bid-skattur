import { ApiProperty } from '@nestjs/swagger';
import { PersonDto } from './person.dto';
import { IncomeDto } from './income.dto';
import { PropertyDto } from './property.dto';
import { DebtDto } from './debt.dto';

export class SubmissionDto {
  @ApiProperty({ description: 'The unique identifier of the submission' })
  id: string;

  @ApiProperty({ description: 'The person associated with this submission' })
  person: PersonDto;

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