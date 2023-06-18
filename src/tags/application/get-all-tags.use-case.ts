import { Inject, Injectable } from '@nestjs/common'
import { TagsTokens } from 'tags/di/tags.tokens'
import { TagsRepository } from 'tags/domain/tags.repository'
import { TagsEntity } from 'tags/domain/tags.entity'

@Injectable()
export class GetAllTags {
	constructor(@Inject(TagsTokens.TAGS_REPOSITORY) private readonly repository: TagsRepository) {}

	run(): Promise<TagsEntity[]> {
		return this.repository.getAllTags()
	}
}
