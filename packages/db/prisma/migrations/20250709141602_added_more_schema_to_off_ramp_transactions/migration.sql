-- CreateEnum
CREATE TYPE "OffRampType" AS ENUM ('Sent', 'Received');

-- AlterTable
ALTER TABLE "OffRampTransaction" ADD COLUMN     "startTime" TIMESTAMP(3),
ADD COLUMN     "type" "OffRampType";
