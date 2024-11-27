/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Queue` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Queue` table. All the data in the column will be lost.
  - You are about to drop the `Receptionist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstName` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialty` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Made the column `medicalHistory` on table `Patient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estimatedWaitTime` on table `Queue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `timeWaited` on table `Queue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estimatedTimeToDoctor` on table `Queue` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Doctor_email_key";

-- DropIndex
DROP INDEX "Queue_patientId_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "status" SET DEFAULT 'Scheduled';

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "updatedAt",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "specialty" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "medicalHistory" SET NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "estimatedWaitTime" SET NOT NULL,
ALTER COLUMN "timeWaited" SET NOT NULL,
ALTER COLUMN "estimatedTimeToDoctor" SET NOT NULL;

-- DropTable
DROP TABLE "Receptionist";
