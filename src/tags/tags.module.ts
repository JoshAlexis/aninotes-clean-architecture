import { Module } from '@nestjs/common'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { TagsTokens } from './di/tags.tokens'
import { TagsPrismaRepository } from './infrastructure/tags-prisma.respository'

@Module({
	imports: [PrismaModule],
	exports: [],
	providers: [
		{
			provide: TagsTokens.TAGS_REPOSITORY,
			useClass: TagsPrismaRepository
		}
	]
})
export class TagsModule {}
