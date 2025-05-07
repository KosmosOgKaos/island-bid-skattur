-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('ISK');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('Imported', 'Submitted', 'Finished');

-- CreateEnum
CREATE TYPE "IncomeType" AS ENUM ('Wages', 'Benefits', 'Other');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('DomesticProperty', 'Vehicle');

-- CreateEnum
CREATE TYPE "DebtType" AS ENUM ('OwnDomicile', 'Other');

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "status" "SubmissionStatus" NOT NULL,
    "index" INTEGER NOT NULL,
    "ssn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "type" "IncomeType" NOT NULL,
    "payer" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'ISK',
    "explanation" TEXT,
    "submissionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "type" "PropertyType" NOT NULL,
    "valueName" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'ISK',
    "properties" JSONB,
    "submissionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debt" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "type" "DebtType" NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'ISK',
    "creditor" TEXT,
    "creditorSsn" TEXT,
    "loanNumber" TEXT,
    "loanStartDate" TIMESTAMP(3),
    "loanDurationYears" INTEGER,
    "yearPaymentTotal" DOUBLE PRECISION,
    "nominalPaymentTotal" DOUBLE PRECISION,
    "interestPaymentTotal" DOUBLE PRECISION NOT NULL,
    "remaining" DOUBLE PRECISION NOT NULL,
    "properties" JSONB,
    "submissionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Debt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_ssn_year_index_key" ON "Submission"("ssn", "year", "index");

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
