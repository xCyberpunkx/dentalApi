/*
  Warnings:

  - You are about to drop the column `date` on the `Queue` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Queue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "date",
DROP COLUMN "time";

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
