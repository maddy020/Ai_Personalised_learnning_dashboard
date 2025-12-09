/*
  Warnings:

  - You are about to drop the `studySession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "studySession" DROP CONSTRAINT "studySession_userId_fkey";

-- DropTable
DROP TABLE "studySession";

-- CreateTable
CREATE TABLE "FocusSession" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "remainingsec" INTEGER,
    "isActive" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FocusSession_userId_key" ON "FocusSession"("userId");

-- AddForeignKey
ALTER TABLE "FocusSession" ADD CONSTRAINT "FocusSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
