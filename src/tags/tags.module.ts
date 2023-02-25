import { Module } from '@nestjs/common'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { TagsTokens } from './di/tags.tokens'
import { TagsEntityMapper } from './infrastructure/tags-entity.mapper'
import { TagsPrismaRepository } from './infrastructure/tags-prisma.respository'
import { GetTagsController } from 'tags/presentation/get-tags.controller'
import { GetAllTags } from './application/get-all-tags.use-case'
import { PostTagsController } from 'tags/presentation/post-tags.controller'
import { CreateTag } from './application/create-tag.use-case'
import { UpdateTag } from './application/update-tag.use-case'
import { PutTagsController } from 'tags/presentation/put-tags.controller'
import { GetTag } from './application/get-tag.use-case'

@Module({
	imports: [PrismaModule],
	providers: [
		{
			provide: TagsTokens.TAGS_REPOSITORY,
			useClass: TagsPrismaRepository
		},
		TagsEntityMapper,
		GetAllTags,
		CreateTag,
		UpdateTag,
		GetTag
	],
	controllers: [GetTagsController, PostTagsController, PutTagsController]
})
export class TagsModule {}
