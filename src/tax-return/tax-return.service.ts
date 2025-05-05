import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Submission } from './types/submission.types';

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

      return person?.submissions[0] ?? null;
    } catch (error) {
      console.error('Error getting latest submission:', error);
      return null;
    }
  }
}