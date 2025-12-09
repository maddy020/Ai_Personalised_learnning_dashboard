-- DropIndex
DROP INDEX "FocusSession_userId_key";

-- AlterTable
ALTER TABLE "FocusSession" ADD CONSTRAINT "FocusSession_pkey" PRIMARY KEY ("id");
