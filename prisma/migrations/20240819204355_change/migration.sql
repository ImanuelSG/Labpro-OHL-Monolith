/*
  Warnings:

  - You are about to drop the column `cover_image` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the `AccessToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccessToken" DROP CONSTRAINT "AccessToken_userEmail_fkey";

-- AlterTable
ALTER TABLE "Film" DROP COLUMN "cover_image",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "cover_image_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "AccessToken";
