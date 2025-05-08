import { Test, TestingModule } from '@nestjs/testing';
import { TaxReturnController } from './tax-return.controller';
import { TaxReturnService } from './tax-return.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionResponseDto } from './dto/response.dto';
import { Submission } from './types/submission.types';
import {
  Currency,
  DebtType,
  IncomeType,
  PropertyType,
  SubmissionStatus,
} from './types/enums';
import { NotFoundException } from '@nestjs/common';

const mockSsn = '1234567890';
const mockSsn2 = '0987654321';
const mockSubmissionId = 1;
const mockDate = new Date();

const mockSubmission: Submission = {
  createdAt: mockDate,
  updatedAt: mockDate,
  id: mockSubmissionId,
  ssn: mockSsn,
  index: 1,
  year: new Date().getFullYear(),
  status: SubmissionStatus.Submitted,
  incomes: [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 1,
      submissionId: mockSubmissionId,
      type: IncomeType.Wages,
      payer: 'Gunnar Gunnarsson',
      amount: 50000,
      currency: Currency.ISK,
      explanation: 'Laun',
    },
  ],
  properties: [
    {
      id: 2,
      submissionId: mockSubmissionId,
      type: PropertyType.Vehicle,
      valueName: 'Honda Civic',
      value: 750000,
      currency: Currency.ISK,
      createdAt: new Date(),
      updatedAt: new Date(),
      properties: {},
    },
  ],
  debts: [
    {
      createdAt: mockDate,
      updatedAt: mockDate,
      creditorSsn: mockSsn2,
      loanDurationYears: 40,
      yearPaymentTotal: 10000,
      loanNumber: '900-900-900',
      loanStartDate: mockDate,
      nominalPaymentTotal: 500000,
      properties: {},
      id: 3,
      submissionId: mockSubmissionId,
      type: DebtType.OwnDomicile,
      currency: Currency.ISK,
      creditor: 'Bankabræður',
      interestPaymentTotal: 50000,
      remaining: 500000,
      description: 'Húslán',
    },
  ],
};

const mockSubmissionResponseDto: SubmissionResponseDto = {
  id: mockSubmission.id,
  ssn: mockSubmission.ssn,
  status: mockSubmission.status,
  incomes: mockSubmission.incomes.map((income) => ({
    id: income.id,
    type: income.type as IncomeType,
    payer: income.payer || undefined,
    amount: income.amount,
    currency: income.currency as Currency,
    explanation: income.explanation || undefined,
  })),
  properties: mockSubmission.properties.map((prop) => ({
    id: prop.id,
    type: prop.type as PropertyType,
    valueName: prop.valueName,
    value: prop.value,
    currency: prop.currency as Currency,
    properties: (prop.properties as Record<string, any>) || undefined,
  })),
  debts: mockSubmission.debts.map((debt) => ({
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
  })),
};

const mockCreateSubmissionDto: CreateSubmissionDto = {
  incomes: [
    {
      type: IncomeType.Wages,
      payer: 'Fjalar og Kompany',
      amount: 60000,
      currency: Currency.ISK,
      explanation: 'Laun',
    },
  ],
  properties: [
    {
      type: PropertyType.Vehicle,
      valueName: 'Toyota Corolla',
      value: 20000,
      currency: Currency.ISK,
      properties: {},
    },
  ],
  debts: [
    {
      type: DebtType.OwnDomicile,
      currency: Currency.ISK,
      creditor: 'Sölusystur',
      interestPaymentTotal: 120000,
      remaining: 12000000,
      description: 'Húslán',
    },
  ],
};

describe('TaxReturnController', () => {
  let controller: TaxReturnController;

  const mockTaxReturnService = {
    getLatestSubmission: jest.fn(),
    createSubmission: jest.fn(),
    finishLatestSubmission: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxReturnController],
      providers: [
        {
          provide: TaxReturnService,
          useValue: mockTaxReturnService,
        },
      ],
    }).compile();

    controller = module.get<TaxReturnController>(TaxReturnController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLatestSubmission', () => {
    it('should return the latest submission for a person', async () => {
      mockTaxReturnService.getLatestSubmission.mockResolvedValue(
        mockSubmission,
      );
      const result = await controller.getLatestSubmission(mockSsn);
      expect(result).toEqual(mockSubmissionResponseDto);
      expect(mockTaxReturnService.getLatestSubmission).toHaveBeenCalledWith(
        mockSsn,
      );
    });

    it('should return null if no submission is found', async () => {
      mockTaxReturnService.getLatestSubmission.mockResolvedValue(null);
      const result = await controller.getLatestSubmission(mockSsn);
      expect(result).toBeNull();
      expect(mockTaxReturnService.getLatestSubmission).toHaveBeenCalledWith(
        mockSsn,
      );
    });
  });

  describe('createSubmission', () => {
    it('should create a new submission and return it', async () => {
      const createdSubmission = {
        ...mockSubmission,
        id: 2,
        status: SubmissionStatus.Submitted,
      };
      mockTaxReturnService.createSubmission.mockResolvedValue(
        createdSubmission,
      );

      const result = await controller.createSubmission(
        mockSsn,
        mockCreateSubmissionDto,
      );

      const expectedDto: SubmissionResponseDto = {
        ...mockSubmissionResponseDto,
        id: createdSubmission.id,
        status: createdSubmission.status,
        incomes: createdSubmission.incomes.map((income) => ({
          id: income.id,
          type: income.type as IncomeType,
          payer: income.payer || undefined,
          amount: income.amount,
          currency: income.currency as Currency,
          explanation: income.explanation || undefined,
        })),
        properties: createdSubmission.properties.map((prop) => ({
          id: prop.id,
          type: prop.type as PropertyType,
          valueName: prop.valueName,
          value: prop.value,
          currency: prop.currency as Currency,
          properties: (prop.properties as Record<string, any>) || undefined,
        })),
        debts: createdSubmission.debts.map((debt) => ({
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
        })),
      };

      expect(result).toEqual(expectedDto);
      expect(mockTaxReturnService.createSubmission).toHaveBeenCalledWith(
        mockSsn,
        mockCreateSubmissionDto,
      );
    });
  });

  describe('finishLatestSubmission', () => {
    it('should mark the latest submission as finished and return it', async () => {
      const finishedSubmission = {
        ...mockSubmission,
        status: SubmissionStatus.Finished,
      };
      mockTaxReturnService.finishLatestSubmission.mockResolvedValue(
        finishedSubmission,
      );

      const result = await controller.finishLatestSubmission(mockSsn);
      const expectedDto: SubmissionResponseDto = {
        ...mockSubmissionResponseDto,
        id: finishedSubmission.id,
        status: SubmissionStatus.Finished,
      };

      expect(result).toEqual(expectedDto);
      expect(mockTaxReturnService.finishLatestSubmission).toHaveBeenCalledWith(
        mockSsn,
      );
    });

    it('should throw NotFoundException if no submission is found to finish', async () => {
      mockTaxReturnService.finishLatestSubmission.mockRejectedValue(
        new NotFoundException('No submission found for this person'),
      );
      await expect(controller.finishLatestSubmission(mockSsn)).rejects.toThrow(
        NotFoundException,
      );
      await expect(controller.finishLatestSubmission(mockSsn)).rejects.toThrow(
        'No submission found for this person',
      );
    });
  });
});
