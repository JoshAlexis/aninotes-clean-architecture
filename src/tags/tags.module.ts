import { Module } from '@nestjs/common'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { TagsTokens } from './di/tags.tokens'
import { TagsEntityMapper } from './infrastructure/tags-entity.mapper'
import { TagsPrismaRepository } from './infrastructure/tags-prisma.respository'
import { GetTagsController } from './infrastructure/controllers/get-tags.controller'
import { GetAllTags } from './application/get-all-tags.use-case'

@Module({
	imports: [PrismaModule],
	exports: [],
	providers: [
		{
			provide: TagsTokens.TAGS_REPOSITORY,
			useClass: TagsPrismaRepository
		},
		TagsEntityMapper,
		GetAllTags
	],
	controllers: [GetTagsController]
})
export class TagsModule {}
