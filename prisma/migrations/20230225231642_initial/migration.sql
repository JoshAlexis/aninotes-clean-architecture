-- CreateTable
CREATE TABLE "pixiv" (
    "id" UUID NOT NULL,
    "idPixiv" INT4 NOT NULL,
    "pixivName" STRING DEFAULT 'In Japanese',
    "link" STRING NOT NULL,
    "favorite" INT4 NOT NULL,
    "quality" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "name" STRING NOT NULL,
    "rated18" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pixivTags" (
    "id" UUID NOT NULL,
    "pixivId" UUID,
    "tagId" UUID,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_id_pixiv" ON "pixiv"("idPixiv");

-- AddForeignKey
ALTER TABLE "pixivTags" ADD CONSTRAINT "fk_pixiv_id_ref_Pixiv" FOREIGN KEY ("pixivId") REFERENCES "pixiv"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pixivTags" ADD CONSTRAINT "fk_tag_id_ref_Tag" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
