-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('STUDY', 'LONGBREAK', 'SHORTBREAK');

-- AlterTable
ALTER TABLE "FocusSession" ADD COLUMN     "type" "SessionType" NOT NULL DEFAULT 'STUDY';
