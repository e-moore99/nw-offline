/*
  Warnings:

  - You are about to drop the column `unitPriceId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitPrice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `images` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_id_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "unitPriceId",
ADD COLUMN     "images" JSONB NOT NULL,
ADD COLUMN     "price" JSONB NOT NULL,
ADD COLUMN     "unitPrice" JSONB NOT NULL;

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Price";

-- DropTable
DROP TABLE "UnitPrice";
