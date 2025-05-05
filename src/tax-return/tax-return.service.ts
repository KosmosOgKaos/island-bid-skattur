import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Submission } from './types/submission.types';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionStatus } from './types/enums';

@Injectable()
export class TaxReturnService {
  constructor(private readonly prisma: PrismaService) {}

  getTaxReturn(): string {
    return 'Tax return data';
  }

  async getLatestSubmission(kennitala: string): Promise<Submission | null> {
    try {
      const person = await this.prisma.person.findUnique({
        where: { kennitala },
        include: {
          submissions: {
            orderBy: { index: 'desc' },
            take: 1,
            include: {
              person: true,
              incomes: true,
              properties: true,
              debts: true,
            },
          },
        },
      });

      if (!person) {
        throw new NotFoundException('Person not found');
      }

      return person.submissions[0] ?? null;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error getting latest submission:', error);
      throw error;
    }
  }

  async createSubmission(
    kennitala: string,
    data: CreateSubmissionDto,
  ): Promise<Submission> {
    try {
      // Get the latest submission index for this person
      const latestSubmission = await this.prisma.submission.findFirst({
        where: { person: { kennitala } },
        orderBy: { index: 'desc' },
      });

      const nextIndex = (latestSubmission?.index ?? 0) + 1;
      const currentYear = new Date().getFullYear();

      // Create the submission with all related data
      return await this.prisma.submission.create({
        data: {
          year: currentYear,
          status: SubmissionStatus.Submitted,
          index: nextIndex,
          person: {
            connect: { kennitala },
          },
          incomes: {
            create: data.incomes,
          },
          properties: {
            create: data.properties,
          },
          debts: {
            create: data.debts,
          },
        },
        include: {
          person: true,
          incomes: true,
          properties: true,
          debts: true,
        },
      });
    } catch (error) {
      console.error('Error creating submission:', error);
      throw error;
    }
  }

  async finishLatestSubmission(kennitala: string): Promise<Submission> {
    try {
      const latestSubmission = await this.prisma.submission.findFirst({
        where: { person: { kennitala } },
        orderBy: { index: 'desc' },
        include: {
          person: true,
          incomes: true,
          properties: true,
          debts: true,
        },
      });

      if (!latestSubmission) {
        throw new NotFoundException('No submission found for this person');
      }

      const updatedSubmission = await this.prisma.submission.update({
        where: { id: latestSubmission.id },
        data: { status: SubmissionStatus.Finished },
        include: {
          person: true,
          incomes: true,
          properties: true,
          debts: true,
        },
      });

      return updatedSubmission;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error finishing submission:', error);
      throw error;
    }
  }
}