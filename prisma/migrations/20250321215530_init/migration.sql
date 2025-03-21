/*
  Warnings:

  - You are about to drop the column `availability` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `images_lg` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `images_md` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `images_sm` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `images_xs` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `originStatement` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_hasLimit` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_isSaleValueCardDependent` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_retailValue` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_value` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice_amount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice_plainText` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice_type` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice_value` on the `Product` table. All the data in the column will be lost.
  - Added the required column `imagesId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPriceId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "availability",
DROP COLUMN "categories",
DROP COLUMN "images_lg",
DROP COLUMN "images_md",
DROP COLUMN "images_sm",
DROP COLUMN "images_xs",
DROP COLUMN "originStatement",
DROP COLUMN "price_hasLimit",
DROP COLUMN "price_isSaleValueCardDependent",
DROP COLUMN "price_retailValue",
DROP COLUMN "price_value",
DROP COLUMN "unitPrice_amount",
DROP COLUMN "unitPrice_plainText",
DROP COLUMN "unitPrice_type",
DROP COLUMN "unitPrice_value",
ADD COLUMN     "imagesId" INTEGER NOT NULL,
ADD COLUMN     "priceId" INTEGER NOT NULL,
ADD COLUMN     "unitPriceId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Availability" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "isSaleValueCardDependent" BOOLEAN NOT NULL,
    "value" INTEGER NOT NULL,
    "retailValue" INTEGER NOT NULL,
    "hasLimit" BOOLEAN NOT NULL,

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
CREATE TABLE "UnitPrice" (
    "id" SERIAL NOT NULL,
    "plainText" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "UnitPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "SaleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AvailabilityToProduct" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AvailabilityToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProductToSaleType" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductToSaleType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AvailabilityToProduct_B_index" ON "_AvailabilityToProduct"("B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE INDEX "_ProductToSaleType_B_index" ON "_ProductToSaleType"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_unitPriceId_fkey" FOREIGN KEY ("unitPriceId") REFERENCES "UnitPrice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailabilityToProduct" ADD CONSTRAINT "_AvailabilityToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Availability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailabilityToProduct" ADD CONSTRAINT "_AvailabilityToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSaleType" ADD CONSTRAINT "_ProductToSaleType_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSaleType" ADD CONSTRAINT "_ProductToSaleType_B_fkey" FOREIGN KEY ("B") REFERENCES "SaleType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
