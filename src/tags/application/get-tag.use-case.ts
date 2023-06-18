import { Inject } from '@nestjs/common'
import { TagsTokens } from 'tags/di/tags.tokens'
import { TagsRepository } from 'tags/domain/tags.repository'
import { TagsEntity } from 'tags/domain/tags.entity'

export class GetTag {
	constructor(@Inject(TagsTokens.TAGS_REPOSITORY) private readonly repository: TagsRepository) {}

	run(id: string): Promise<TagsEntity> {
		return this.repository.getTagById(id)
	}
}
