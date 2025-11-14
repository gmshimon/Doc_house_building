/*
  Warnings:

  - A unique constraint covering the columns `[doctorId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Award" DROP CONSTRAINT "Award_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Business_hour" DROP CONSTRAINT "Business_hour_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Doctor" DROP CONSTRAINT "Doctor_addressId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Education" DROP CONSTRAINT "Education_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Experience" DROP CONSTRAINT "Experience_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "doctorId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Address_doctorId_key" ON "Address"("doctorId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business_hour" ADD CONSTRAINT "Business_hour_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
