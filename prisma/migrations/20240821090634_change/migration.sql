/*
  Warnings:

  - You are about to drop the column `Rating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `Review` on the `Review` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "Rating",
DROP COLUMN "Review",
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "review" TEXT NOT NULL;
