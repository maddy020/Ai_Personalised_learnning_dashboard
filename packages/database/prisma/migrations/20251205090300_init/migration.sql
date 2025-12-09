/*
  Warnings:

  - Added the required column `remainingsec` to the `studySession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "studySession" ADD COLUMN     "remainingsec" INTEGER NOT NULL;
