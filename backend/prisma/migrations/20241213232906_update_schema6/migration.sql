/*
  Warnings:

  - Changed the type of `phone` on the `Supplier` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;
