/*
  Warnings:

  - Added the required column `isActive` to the `studySession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "studySession" ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ALTER COLUMN "remainingsec" DROP NOT NULL;
