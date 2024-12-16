/*
  Warnings:

  - You are about to drop the `_PositionProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PositionProduct" DROP CONSTRAINT "_PositionProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_PositionProduct" DROP CONSTRAINT "_PositionProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "positionId" INTEGER;

-- DropTable
DROP TABLE "_PositionProduct";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;
