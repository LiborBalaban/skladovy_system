/*
  Warnings:

  - You are about to drop the column `code` on the `User` table. All the data in the column will be lost.
  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "code",
ADD COLUMN     "token" VARCHAR(255) NOT NULL;
