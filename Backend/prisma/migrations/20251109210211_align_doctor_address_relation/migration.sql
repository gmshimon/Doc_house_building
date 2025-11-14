/*
  Warnings:

  - You are about to drop the column `doctorId` on the `Address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_doctorId_fkey";

-- DropIndex
DROP INDEX "public"."Address_doctorId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "doctorId";

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
