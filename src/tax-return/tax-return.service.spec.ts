import { Test, TestingModule } from '@nestjs/testing';
import { TaxReturnService } from './tax-return.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import {
  Currency,
  DebtType,
  IncomeType,
  PropertyType,
  SubmissionStatus,
} from './types/enums';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Submission } from './types/submission.types';

const mockPrismaService = {
  submission: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

// The testing output has errors that look scary
const TEST_ERRORS_PREFIX = 'TESTERROR. This output is expected: ';

describe('TaxReturnService', () => {
  let service: TaxReturnService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxReturnService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TaxReturnService>(TaxReturnService);
    prisma = module.get(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTaxReturn', () => {
    it('smoketest', () => {
      expect(service.getTaxReturn()).toEqual('Tax return data');
    });
  });

  describe('getLatestSubmission', () => {
    const ssn = '1234567890';
    const mockSubmission: Submission = {
      id: 1,
      ssn,
      year: 2025,
      status: SubmissionStatus.Submitted,
      index: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      incomes: [],
      properties: [],
      debts: [],
    };

    it('should return the latest submission if found', async () => {
      prisma.submission.findFirst.mockResolvedValue(mockSubmission);

      const result = await service.getLatestSubmission(ssn);

      expect(result).toEqual(mockSubmission);
      expect(prisma.submission.findFirst).toHaveBeenCalledWith({
        where: { ssn },
        orderBy: { index: 'desc' },
        include: {
          incomes: true,
          properties: true,
          debts: true,
        },
      });
    });

    it('should return null if no submission is found', async () => {
      prisma.submission.findFirst.mockResolvedValue(null);

      const result = await service.getLatestSubmission(ssn);

      expect(result).toBeNull();
      expect(prisma.submission.findFirst).toHaveBeenCalledWith({
        where: { ssn },
        orderBy: { index: 'desc' },
        include: {
          incomes: true,
          properties: true,
          debts: true,
        },
      });
    });

    it('should throw an error if PrismaService throws an error', async () => {
      const errorMessage = `${TEST_ERRORS_PREFIX}Database error`;
      prisma.submission.findFirst.mockRejectedValue(new Error(errorMessage));

      await expect(service.getLatestSubmission(ssn)).rejects.toThrow(Error);
      await expect(service.getLatestSubmission(ssn)).rejects.toThrow(
        errorMessage,
      );
    });

    it('should re-throw NotFoundException if PrismaService throws it', async () => {
      const notFoundError = new NotFoundException('Custom not found');
      prisma.submission.findFirst.mockRejectedValue(notFoundError);

      await expect(service.getLatestSubmission(ssn)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getLatestSubmission(ssn)).rejects.toThrow(
        'Custom not found',
      );
    });
  });

  describe('createSubmission', () => {
    const ssn = '1234567890';
    const createDto: CreateSubmissionDto = {
      incomes: [
        {
          type: IncomeType.Benefits,
          amount: 50000,
          explanation: 'Bætur',
          currency: Currency.ISK,
        },
      ],
      properties: [
        {
          type: PropertyType.DomesticProperty,
          value: 200000,
          currency: Currency.ISK,
          valueName: 'Fasteign',
        },
      ],
      debts: [
        {
          type: DebtType.OwnDomicile,
          currency: Currency.ISK,
          description: 'Húslán',
          interestPaymentTotal: 90000,
          remaining: 900000,
        },
      ],
    };
    const currentYear = new Date().getFullYear();

    const mockCreatedSubmission = (index: number): Submission => ({
      id: index,
      ssn,
      year: currentYear,
      status: SubmissionStatus.Submitted,
      index,
      createdAt: new Date(),
      updatedAt: new Date(),
      incomes: createDto.incomes as unknown as Submission['incomes'],
      properties: createDto.properties as unknown as Submission['properties'],
      debts: createDto.debts as unknown as Submission['debts'],
    });

    it('should create a new submission with index 1 if no previous submissions exist', async () => {
      prisma.submission.findFirst.mockResolvedValue(null);
      const expectedSubmission = mockCreatedSubmission(1);
      prisma.submission.create.mockResolvedValue(expectedSubmission);

      const result = await service.createSubmission(ssn, createDto);

      expect(result).toEqual(expectedSubmission);
      expect(prisma.submission.findFirst).toHaveBeenCalledWith({
        where: { ssn },
        orderBy: { index: 'desc' },
      });
      expect(prisma.submission.create).toHaveBeenCalledWith({
        data: {
          year: currentYear,
          status: SubmissionStatus.Submitted,
          index: 1,
          ssn,
          incomes: { create: createDto.incomes },
          properties: { create: createDto.properties },
          debts: { create: createDto.debts },
        },
        include: {
          incomes: true,
          properties: true,
          debts: true,
        },
      });
    });

    it('should throw an error if PrismaService.create throws an error', async () => {
      prisma.submission.findFirst.mockResolvedValue(null);
      const errorMessage = `${TEST_ERRORS_PREFIX}Create failed`;
      prisma.submission.create.mockRejectedValue(new Error(errorMessage));

      await expect(service.createSubmission(ssn, createDto)).rejects.toThrow(
        Error,
      );
      await expect(service.createSubmission(ssn, createDto)).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe('finishLatestSubmission', () => {
    const ssn = '1234567890';
    const mockLatestSubmission: Submission = {
      id: 1,
      ssn,
      year: 2025,
      status: SubmissionStatus.Submitted,
      index: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      incomes: [],
      properties: [],
      debts: [],
    };

    it('should finish the latest submission if found', async () => {
      prisma.submission.findFirst.mockResolvedValue(mockLatestSubmission);
      const updatedSubmission = {
        ...mockLatestSubmission,
        status: SubmissionStatus.Finished,
      };
      prisma.submission.update.mockResolvedValue(updatedSubmission);

      const result = await service.finishLatestSubmission(ssn);

      expect(result).toEqual(updatedSubmission);
      expect(prisma.submission.findFirst).toHaveBeenCalledWith({
        where: { ssn },
        orderBy: { index: 'desc' },
        include: {
          incomes: true,
          properties: true,
          debts: true,
        },
      });
      expect(prisma.submission.update).toHaveBeenCalledWith({
        where: { id: mockLatestSubmission.id },
        data: { status: SubmissionStatus.Finished },
        include: {
          incomes: true,
          properties: true,
          debts: true,
        },
      });
    });

    it('should throw NotFoundException if no submission is found to finish', async () => {
      prisma.submission.findFirst.mockResolvedValue(null);

      await expect(service.finishLatestSubmission(ssn)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.finishLatestSubmission(ssn)).rejects.toThrow(
        'No submission found for this person',
      );
      expect(prisma.submission.update).not.toHaveBeenCalled();
    });

    it('should throw an error if PrismaService.update throws an error', async () => {
      prisma.submission.findFirst.mockResolvedValue(mockLatestSubmission);
      const errorMessage = `${TEST_ERRORS_PREFIX}Update failed`;
      prisma.submission.update.mockRejectedValue(new Error(errorMessage));

      await expect(service.finishLatestSubmission(ssn)).rejects.toThrow(Error);
      await expect(service.finishLatestSubmission(ssn)).rejects.toThrow(
        errorMessage,
      );
    });

    it('should re-throw NotFoundException if it occurs during the findFirst call', async () => {
      const notFoundError = new NotFoundException(
        'Could not find during finish',
      );
      prisma.submission.findFirst.mockRejectedValue(notFoundError);

      await expect(service.finishLatestSubmission(ssn)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.finishLatestSubmission(ssn)).rejects.toThrow(
        'Could not find during finish',
      );
      expect(prisma.submission.update).not.toHaveBeenCalled();
    });
  });
});
