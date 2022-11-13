-- CreateTable
CREATE TABLE "pixiv" (
    "id" SERIAL NOT NULL,
    "idPixiv" INTEGER NOT NULL,
    "pixivName" TEXT DEFAULT 'In Japanese',
    "link" TEXT NOT NULL,
    "favorite" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pixiv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rated18" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pixivTags" (
    "id" SERIAL NOT NULL,
    "pixivId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "pixivTags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pixiv_idPixiv_key" ON "pixiv"("idPixiv");

-- AddForeignKey
ALTER TABLE "pixivTags" ADD CONSTRAINT "pixivTags_pixivId_fkey" FOREIGN KEY ("pixivId") REFERENCES "pixiv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pixivTags" ADD CONSTRAINT "pixivTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
