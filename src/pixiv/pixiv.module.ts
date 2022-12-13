import { Module } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivPrismaRepository } from 'pixiv/infrastructure/pixiv-prisma.repository'
import { CreatePixiv } from 'pixiv/application/create-pixiv.use-case'
import { UpdatePixiv } from 'pixiv/application/update-pixiv.use-case'

@Module({
	providers: [
		{
			provide: PixivTokens.PIXIV_REPOSITORY,
			useClass: PixivPrismaRepository
		},
		CreatePixiv,
		UpdatePixiv
	]
})
export class PixivModule {}
