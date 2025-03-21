/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ImagesToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PriceToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `images_lg` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images_md` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images_sm` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images_xs` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_hasLimit` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_isSaleValueCardDependent` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_retailValue` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_value` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ImagesToProduct" DROP CONSTRAINT "_ImagesToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImagesToProduct" DROP CONSTRAINT "_ImagesToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_PriceToProduct" DROP CONSTRAINT "_PriceToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_PriceToProduct" DROP CONSTRAINT "_PriceToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "images_lg" TEXT NOT NULL,
ADD COLUMN     "images_md" TEXT NOT NULL,
ADD COLUMN     "images_sm" TEXT NOT NULL,
ADD COLUMN     "images_xs" TEXT NOT NULL,
ADD COLUMN     "price_hasLimit" BOOLEAN NOT NULL,
ADD COLUMN     "price_isSaleValueCardDependent" BOOLEAN NOT NULL,
ADD COLUMN     "price_retailValue" INTEGER NOT NULL,
ADD COLUMN     "price_value" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Images";

-- DropTable
DROP TABLE "Price";

-- DropTable
DROP TABLE "_ImagesToProduct";

-- DropTable
DROP TABLE "_PriceToProduct";
