-- AlterTable
ALTER TABLE "Business_hour" ALTER COLUMN "special_notes" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;
