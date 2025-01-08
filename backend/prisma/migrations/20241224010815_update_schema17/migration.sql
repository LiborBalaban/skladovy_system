-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_supplierId_fkey";

-- AlterTable
ALTER TABLE "StockMovement" ALTER COLUMN "supplierId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
