/*
  Warnings:

  - You are about to drop the `Availability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AvailabilityToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AvailabilityToProduct" DROP CONSTRAINT "_AvailabilityToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_AvailabilityToProduct" DROP CONSTRAINT "_AvailabilityToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "availability" TEXT[];

-- DropTable
DROP TABLE "Availability";

-- DropTable
DROP TABLE "_AvailabilityToProduct";
