/*
  Warnings:

  - You are about to drop the column `productId` on the `Position` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_productId_fkey";

-- AlterTable
ALTER TABLE "Position" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "_PositionProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PositionProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PositionProduct_B_index" ON "_PositionProduct"("B");

-- AddForeignKey
ALTER TABLE "_PositionProduct" ADD CONSTRAINT "_PositionProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PositionProduct" ADD CONSTRAINT "_PositionProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
