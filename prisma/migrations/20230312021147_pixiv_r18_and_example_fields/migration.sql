/*
  Warnings:

  - Added the required column `example` to the `pixiv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pixiv" ADD COLUMN     "example" STRING NOT NULL;
ALTER TABLE "pixiv" ADD COLUMN     "hasR18Content" BOOL NOT NULL DEFAULT false;
