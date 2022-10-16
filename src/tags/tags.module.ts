import { Module } from '@nestjs/common'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { TagsTokens } from './di/tags.tokens'
import { TagsEntityMapper } from './infrastructure/tags-entity.mapper'
import { TagsPrismaRepository } from './infrastructure/tags-prisma.respository'

@Module({
	imports: [PrismaModule],
	exports: [],
	providers: [
		{
			provide: TagsTokens.TAGS_REPOSITORY,
			useClass: TagsPrismaRepository
		},
		TagsEntityMapper
	]
})
export class TagsModule {}
