-- CreateTable
CREATE TABLE "studySession" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "studySession_userId_key" ON "studySession"("userId");

-- AddForeignKey
ALTER TABLE "studySession" ADD CONSTRAINT "studySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
