/*
  Warnings:

  - Added the required column `singlePromo` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "singlePromo" JSONB NOT NULL;
