import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaxReturnService } from './tax-return.service';
import { Submission } from './types/submission.types';
import {
  SubmissionResponseDto,
  IncomeResponseDto,
  PropertyResponseDto,
  DebtResponseDto,
} from './dto/response.dto';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { IncomeType, PropertyType, DebtType, Currency } from './types/enums';

@ApiTags('Tax Return')
@Controller('/api/tax-return')
export class TaxReturnController {
  constructor(private readonly taxReturnService: TaxReturnService) {}

  @Get(':ssn/latest')
  @ApiOperation({ summary: 'Get latest submission for a person' })
  @ApiResponse({
    status: 200,
    description: 'Returns the latest submission for a person',
    type: SubmissionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Person not found' })
  async getLatestSubmission(
    @Param('ssn') ssn: string,
  ): Promise<SubmissionResponseDto | null> {
    const submission = await this.taxReturnService.getLatestSubmission(ssn);

    return submission ? this.mapToSubmissionDto(submission) : null;
  }

  @Post(':ssn')
  @ApiOperation({ summary: 'Create a new submission for a person' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created submission',
    type: SubmissionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid submission data' })
  async createSubmission(
    @Param('ssn') ssn: string,
    @Body() data: CreateSubmissionDto,
  ): Promise<SubmissionResponseDto> {
    const submission = await this.taxReturnService.createSubmission(ssn, data);
    return this.mapToSubmissionDto(submission);
  }

  @Put(':ssn/latest/finish')
  @ApiOperation({ summary: 'Mark the latest submission as finished' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated submission',
    type: SubmissionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Person or submission not found' })
  async finishLatestSubmission(
    @Param('ssn') ssn: string,
  ): Promise<SubmissionResponseDto> {
    const submission = await this.taxReturnService.finishLatestSubmission(ssn);

    return this.mapToSubmissionDto(submission);
  }

  private mapToSubmissionDto(submission: Submission): SubmissionResponseDto {
    const incomeDtos: IncomeResponseDto[] = submission.incomes.map(
      (income) => ({
        id: income.id,
        type: income.type as IncomeType,
        payer: income.payer || undefined,
        amount: income.amount,
        currency: income.currency as Currency,
        explanation: income.explanation || undefined,
      }),
    );

    const propertyDtos: PropertyResponseDto[] = submission.properties.map(
      (property) => ({
        id: property.id,
        type: property.type as PropertyType,
        valueName: property.valueName,
        value: property.value,
        currency: property.currency as Currency,
        properties: (property.properties as Record<string, any>) || undefined,
      }),
    );

    const debtDtos: DebtResponseDto[] = submission.debts.map((debt) => ({
      id: debt.id,
      description: debt.description || undefined,
      type: debt.type as DebtType,
      currency: debt.currency as Currency,
      creditor: debt.creditor || undefined,
      creditorSsn: debt.creditorSsn || undefined,
      loanNumber: debt.loanNumber || undefined,
      loanStartDate: debt.loanStartDate || undefined,
      loanDurationYears: debt.loanDurationYears || undefined,
      yearPaymentTotal: debt.yearPaymentTotal || undefined,
      nominalPaymentTotal: debt.nominalPaymentTotal || undefined,
      interestPaymentTotal: debt.interestPaymentTotal,
      remaining: debt.remaining,
      properties: (debt.properties as Record<string, any>) || undefined,
    }));

    return {
      id: submission.id,
      ssn: submission.ssn,
      status: submission.status,
      incomes: incomeDtos,
      properties: propertyDtos,
      debts: debtDtos,
    };
  }
}
