import { Inject } from '@nestjs/common'
import { TagsTokens } from 'tags/di/tags.tokens'
import { TagEntity } from 'tags/domain/tag.entity'
import { TagsRepository } from 'tags/domain/tags.repository'

export class GetAllTags {
	constructor(@Inject(TagsTokens.TAGS_REPOSITORY) private readonly repository: TagsRepository) {}

	run(): Promise<TagEntity[]> {
		return this.repository.getAllTags()
	}
}
