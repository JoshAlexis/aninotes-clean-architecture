import { Inject, Injectable } from '@nestjs/common'
import { TagsTokens } from 'tags/di/tags.tokens'
import { CreateTagDto } from 'tags/domain/dto/create-tag.dto'
import { TagEntity } from 'tags/domain/tag.entity'
import { TagsRepository } from 'tags/domain/tags.repository'

@Injectable()
export class CreateTag {
	constructor(@Inject(TagsTokens.TAGS_REPOSITORY) private readonly repository: TagsRepository) {}

	run(data: CreateTagDto): Promise<TagEntity> {
		return this.repository.createTag(data)
	}
}
