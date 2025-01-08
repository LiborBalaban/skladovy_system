/*
  Warnings:

  - A unique constraint covering the columns `[productId,storageId]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_productId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_storageId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Stock_productId_storageId_key" ON "Stock"("productId", "storageId");
