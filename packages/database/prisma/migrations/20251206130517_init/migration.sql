/*
  Warnings:

  - You are about to drop the column `isActive` on the `FocusSession` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('RUNNING', 'COMPLETED', 'PAUSED');

-- AlterTable
ALTER TABLE "FocusSession" DROP COLUMN "isActive",
ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'RUNNING';
