/*
  Warnings:

  - You are about to drop the `appointmentType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[gender]` on the table `Sex` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `date` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `AppointmentStatus` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `date` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `PaymentStatus` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Queue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `Sex` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "AppointmentStatusEnum" AS ENUM ('WAITING', 'UPCOMING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentStatusEnum" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QueueStatusEnum" AS ENUM ('WAITING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_typeId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "AppointmentStatus" DROP COLUMN "status",
ADD COLUMN     "status" "AppointmentStatusEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PaymentStatus" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatusEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "status",
ADD COLUMN     "status" "QueueStatusEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Sex" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- DropTable
DROP TABLE "appointmentType";

-- CreateTable
CREATE TABLE "AppointmentType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "AppointmentType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentType_type_key" ON "AppointmentType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentStatus_status_key" ON "AppointmentStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentStatus_status_key" ON "PaymentStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Sex_gender_key" ON "Sex"("gender");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AppointmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
