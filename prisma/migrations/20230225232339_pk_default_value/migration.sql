-- DropForeignKey
ALTER TABLE "pixivTags" DROP CONSTRAINT "fk_tag_id_ref_Tag";

-- AlterTable
ALTER TABLE "pixiv" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "pixivTags" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AddForeignKey
ALTER TABLE "pixivTags" ADD CONSTRAINT "fk_tag_id_ref_Tag" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
