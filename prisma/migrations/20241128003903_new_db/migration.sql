/*
  Warnings:

  - You are about to drop the column `status` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "dateOfBirth";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AppointmentStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "AppointmentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "PaymentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentStatus_status_key" ON "AppointmentStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentStatus_status_key" ON "PaymentStatus"("status");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AppointmentStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "PaymentStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
