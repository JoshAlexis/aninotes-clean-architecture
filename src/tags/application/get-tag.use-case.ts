import { Inject, Injectable } from '@nestjs/common'
import { TagsTokens } from 'tags/di/tags.tokens'
import { TagsRepository } from 'tags/domain/tags.repository'
import { TagsEntity } from 'tags/domain/tags.entity'
import { TagNotFoundError } from 'tags/domain/errors/tag-not-found.error'

@Injectable()
export class GetTag {
	constructor(@Inject(TagsTokens.TAGS_REPOSITORY) private readonly repository: TagsRepository) {}

	async run(id: string): Promise<TagsEntity> {
		const tag = await this.repository.getTagById(id)

		if (tag === null) throw new TagNotFoundError()

		return tag
	}
}
