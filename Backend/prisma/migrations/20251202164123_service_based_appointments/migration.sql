/*
  Warnings:

  - You are about to drop the column `services` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "serviceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "services";

-- AlterTable
ALTER TABLE "Slot" ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "serviceId" INTEGER,
ADD COLUMN     "startTime" TEXT;

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 30,
    "fee" INTEGER,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DoctorServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DoctorServices_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DoctorServices_B_index" ON "_DoctorServices"("B");

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorServices" ADD CONSTRAINT "_DoctorServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorServices" ADD CONSTRAINT "_DoctorServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
