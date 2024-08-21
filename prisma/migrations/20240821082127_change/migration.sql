/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filmId,userId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userEmail_fkey";

-- DropIndex
DROP INDEX "Transaction_filmId_userEmail_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_filmId_userId_key" ON "Transaction"("filmId", "userId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
