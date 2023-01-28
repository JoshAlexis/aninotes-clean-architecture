-- DropForeignKey
ALTER TABLE "pixivTags" DROP CONSTRAINT "pixivTags_pixivId_fkey";

-- DropForeignKey
ALTER TABLE "pixivTags" DROP CONSTRAINT "pixivTags_tagId_fkey";

-- AddForeignKey
ALTER TABLE "pixivTags" ADD CONSTRAINT "pixivTags_pixivId_fkey" FOREIGN KEY ("pixivId") REFERENCES "pixiv"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pixivTags" ADD CONSTRAINT "pixivTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
