/*
  Warnings:

  - You are about to drop the column `appointmentType` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appointmentType",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "appointmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
