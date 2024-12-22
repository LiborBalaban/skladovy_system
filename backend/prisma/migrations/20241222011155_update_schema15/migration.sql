/*
  Warnings:

  - The `invoiceNumber` column on the `StockMovement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `description` to the `StockMovement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
DROP COLUMN "invoiceNumber",
ADD COLUMN     "invoiceNumber" INTEGER;
