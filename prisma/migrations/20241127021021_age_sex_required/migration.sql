/*
  Warnings:

  - Made the column `age` on table `Patient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sex` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "sex" SET NOT NULL;
