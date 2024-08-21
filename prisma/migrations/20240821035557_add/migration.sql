/*
  Warnings:

  - A unique constraint covering the columns `[filmId,username]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[filmId,userEmail]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[filmId,userId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_filmId_username_key" ON "Review"("filmId", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_filmId_userEmail_key" ON "Transaction"("filmId", "userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_filmId_userId_key" ON "Wishlist"("filmId", "userId");
