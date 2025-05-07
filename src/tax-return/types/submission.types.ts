import type { Prisma } from '../../../generated/prisma/index';

export type Income = Prisma.IncomeGetPayload<{
  include: {
    submission: true;
  };
}>;

export type Property = Prisma.PropertyGetPayload<{
  include: {
    submission: true;
  };
}>;

export type Debt = Prisma.DebtGetPayload<{
  include: {
    submission: true;
  };
}>;

export type Submission = Prisma.SubmissionGetPayload<{
  include: {
    incomes: true;
    properties: true;
    debts: true;
  };
}>;
