/*
  Warnings:

  - You are about to drop the column `arrivalTime` on the `Queue` table. All the data in the column will be lost.
  - You are about to drop the column `timeWaited` on the `Queue` table. All the data in the column will be lost.
  - Added the required column `appointmentId` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_patientId_fkey";

-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "arrivalTime",
DROP COLUMN "timeWaited",
ADD COLUMN     "appointmentId" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
