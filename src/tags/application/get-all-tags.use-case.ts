import { Inject, Injectable } from '@nestjs/common'
import { TagsTokens } from 'tags/di/tags.tokens'
import { TagEntity } from 'tags/domain/tag.entity'
import { TagsRepository } from 'tags/domain/tags.repository'

@Injectable()
export class GetAllTags {
	constructor(@Inject(TagsTokens.TAGS_REPOSITORY) private readonly repository: TagsRepository) {}

	run(): Promise<TagEntity[]> {
		return this.repository.getAllTags()
	}
}
