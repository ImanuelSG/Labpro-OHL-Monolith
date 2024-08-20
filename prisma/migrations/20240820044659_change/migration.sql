/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Wishlist` table. All the data in the column will be lost.
  - Added the required column `username` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_userEmail_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "userEmail",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
