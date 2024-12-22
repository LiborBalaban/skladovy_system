/*
  Warnings:

  - Added the required column `userId` to the `StockMovement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `StockTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StockTransaction" ADD COLUMN     "price" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
