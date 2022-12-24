import { Module } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivPrismaRepository } from 'pixiv/infrastructure/pixiv-prisma.repository'
import { CreatePixiv } from 'pixiv/application/create-pixiv.use-case'
import { UpdatePixiv } from 'pixiv/application/update-pixiv.use-case'
import { GetPixivList } from 'pixiv/application/get-pixiv-list.use-case'
import { GetPixivById } from 'pixiv/application/get-pixiv-by-id.use-case'
import { GetPixivByIdPixiv } from 'pixiv/application/get-pixiv-by-id-pixiv.use-case'

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
		GetPixivByIdPixiv
	]
})
export class PixivModule {}
