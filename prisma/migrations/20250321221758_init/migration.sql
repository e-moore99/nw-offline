/*
  Warnings:

  - The primary key for the `Price` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imagesId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `restrictedFlag` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tobaccoFlag` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `UnitPrice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SaleType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToSaleType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isRestrictedByAge` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTobacco` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weighable` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_imagesId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_priceId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_unitPriceId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSaleType" DROP CONSTRAINT "_ProductToSaleType_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSaleType" DROP CONSTRAINT "_ProductToSaleType_B_fkey";

-- AlterTable
ALTER TABLE "Price" DROP CONSTRAINT "Price_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "retailValue" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "Price_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Price_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imagesId",
DROP COLUMN "restrictedFlag",
DROP COLUMN "tobaccoFlag",
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "isRestrictedByAge" BOOLEAN NOT NULL,
ADD COLUMN     "isTobacco" BOOLEAN NOT NULL,
ADD COLUMN     "saleTypes" TEXT[],
ADD COLUMN     "weighable" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "UnitPrice" DROP CONSTRAINT "UnitPrice_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UnitPrice_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UnitPrice_id_seq";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Images";

-- DropTable
DROP TABLE "SaleType";

-- DropTable
DROP TABLE "_CategoryToProduct";

-- DropTable
DROP TABLE "_ProductToSaleType";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "lg" TEXT NOT NULL,
    "md" TEXT NOT NULL,
    "sm" TEXT NOT NULL,
    "xs" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_fkey" FOREIGN KEY ("id") REFERENCES "UnitPrice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
