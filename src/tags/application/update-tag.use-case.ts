import { Inject } from '@nestjs/common'
import { TagsTokens } from 'tags/di/tags.tokens'
import { TagsRepository } from 'tags/domain/tags.repository'
import { UpdateTagInputDto } from 'tags/application/dto/update-tag-input.dto'
import { TagsEntity } from 'tags/domain/tags.entity'
import { TagNotFoundError } from 'tags/domain/errors/tag-not-found.error'

export class UpdateTag {
	constructor(@Inject(TagsTokens.TAGS_REPOSITORY) private readonly repository: TagsRepository) {}

	async run(id: string, data: UpdateTagInputDto): Promise<TagsEntity> {
		const tag = await this.repository.getTagById(id)

		if (tag === null) throw new TagNotFoundError()
		return this.repository.updateTag(id, this.mapToEntity(data))
	}

	private mapToEntity(data: UpdateTagInputDto): TagsEntity {
		return new TagsEntity('', data.name, data.rated18, '', '')
	}
}
