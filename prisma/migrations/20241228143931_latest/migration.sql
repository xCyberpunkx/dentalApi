-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_treatmentId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "clinicId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "treatmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
