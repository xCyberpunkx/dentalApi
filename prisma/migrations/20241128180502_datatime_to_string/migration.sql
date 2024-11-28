/*
  Warnings:

  - You are about to drop the column `specialty` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `specialtyId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexId` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "specialty",
ADD COLUMN     "specialtyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "sex",
ADD COLUMN     "sexId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "time" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Sex" (
    "id" SERIAL NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Sex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_sexId_fkey" FOREIGN KEY ("sexId") REFERENCES "Sex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
