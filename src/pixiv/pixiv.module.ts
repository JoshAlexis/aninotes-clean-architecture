import { Module } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivPrismaRepository } from 'pixiv/infrastructure/pixiv-prisma.repository'
import { CreatePixiv } from 'pixiv/application/create-pixiv.use-case'
import { UpdatePixiv } from 'pixiv/application/update-pixiv.use-case'
import { GetPixivList } from 'pixiv/application/get-pixiv-list.use-case'
import { GetPixivById } from 'pixiv/application/get-pixiv-by-id.use-case'
import { GetPixivByIdPixiv } from 'pixiv/application/get-pixiv-by-id-pixiv.use-case'
import { PixivEntityMapper } from 'pixiv/infrastructure/pixiv-entity.mapper'
import { PostPixivController } from 'pixiv/presentation/post-pixiv-controller'
import { PostPixivTagsController } from 'pixiv/presentation/post-pixiv-tags-controller'
import { GetPixivController } from 'pixiv/presentation/get-pixiv-controller'
import { DeletePixivTagsController } from 'pixiv/presentation/delete-pixiv-tags.controller'
import { PutPixivController } from 'pixiv/presentation/put-pixiv-controller'
import { AssignTagToPixiv } from 'pixiv/application/assign-tag-pixiv'
import { RemoveTagFromPixiv } from 'pixiv/application/remove-tag-pixiv'

@Module({
	providers: [
		{
			provide: PixivTokens.PIXIV_REPOSITORY,
			useClass: PixivPrismaRepository
		},
		CreatePixiv,
		UpdatePixiv,
		GetPixivList,
		GetPixivById,
		GetPixivByIdPixiv,
		AssignTagToPixiv,
		RemoveTagFromPixiv,
		PixivEntityMapper
	],
	controllers: [
		PostPixivController,
		PostPixivTagsController,
		GetPixivController,
		DeletePixivTagsController,
		PutPixivController
	]
})
export class PixivModule {}
