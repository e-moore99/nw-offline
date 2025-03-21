/*
  Warnings:

  - You are about to drop the column `availability` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image_lg` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image_md` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image_sm` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image_xs` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_hasLimit` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_isSaleValueCardDependent` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_retailValue` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_value` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `saleType` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "availability",
DROP COLUMN "displayName",
DROP COLUMN "image_lg",
DROP COLUMN "image_md",
DROP COLUMN "image_sm",
DROP COLUMN "image_xs",
DROP COLUMN "price_hasLimit",
DROP COLUMN "price_isSaleValueCardDependent",
DROP COLUMN "price_retailValue",
DROP COLUMN "price_value",
DROP COLUMN "saleType";

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "isSaleValueCardDependent" BOOLEAN NOT NULL,
    "price_value" INTEGER NOT NULL,
    "price_retailValue" INTEGER NOT NULL,
    "price_hasLimit" BOOLEAN NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "lg" TEXT NOT NULL,
    "md" TEXT NOT NULL,
    "sm" TEXT NOT NULL,
    "xs" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PriceToProduct" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PriceToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ImagesToProduct" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ImagesToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PriceToProduct_B_index" ON "_PriceToProduct"("B");

-- CreateIndex
CREATE INDEX "_ImagesToProduct_B_index" ON "_ImagesToProduct"("B");

-- AddForeignKey
ALTER TABLE "_PriceToProduct" ADD CONSTRAINT "_PriceToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PriceToProduct" ADD CONSTRAINT "_PriceToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImagesToProduct" ADD CONSTRAINT "_ImagesToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImagesToProduct" ADD CONSTRAINT "_ImagesToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;
