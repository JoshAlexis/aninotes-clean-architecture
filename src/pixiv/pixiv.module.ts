import { Module } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivPrismaRepository } from 'pixiv/infrastructure/pixiv-prisma.repository'
import { PixivEntityMapper } from 'pixiv/infrastructure/pixiv-entity.mapper'
import { PostPixivController } from 'pixiv/presentation/post-pixiv.controller'
import { PostPixivTagsController } from 'pixiv/presentation/post-pixiv-tags.controller'
import { GetPixivController } from 'pixiv/presentation/get-pixiv.controller'
import { DeletePixivTagsController } from 'pixiv/presentation/delete-pixiv-tags.controller'
import { PutPixivController } from 'pixiv/presentation/put-pixiv.controller'
import { PixivPresenterMapper } from 'pixiv/presentation/presenters/pixiv-presenter.mapper'
import {
	AssignTagToPixiv,
	CreatePixiv,
	GetPixivById,
	GetPixivByIdPixiv,
	GetPixivList,
	RemoveTagFromPixiv,
	UpdatePixiv
} from './application'

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
		PixivEntityMapper,
		PixivPresenterMapper
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
