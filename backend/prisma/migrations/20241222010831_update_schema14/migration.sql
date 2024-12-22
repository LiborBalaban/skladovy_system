/*
  Warnings:

  - You are about to drop the column `transactionType` on the `StockMovement` table. All the data in the column will be lost.
  - Added the required column `supplierId` to the `StockMovement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `StockMovement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockMovement" DROP COLUMN "transactionType",
ADD COLUMN     "supplierId" INTEGER NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "MovementType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "MovementType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MovementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
