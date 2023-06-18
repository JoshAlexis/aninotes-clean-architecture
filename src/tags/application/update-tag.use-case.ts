import { Inject } from '@nestjs/common'
import { TagsTokens } from 'tags/di/tags.tokens'
import { TagsRepository } from 'tags/domain/tags.repository'
import { UpdateTagInputDto } from 'tags/application/dto/update-tag-input.dto'
import { TagsEntity } from 'tags/domain/tags.entity'

export class UpdateTag {
	constructor(@Inject(TagsTokens.TAGS_REPOSITORY) private readonly repository: TagsRepository) {}

	run(id: string, data: UpdateTagInputDto): Promise<TagsEntity> {
		return this.repository.updateTag(id, this.mapToEntity(data))
	}

	private mapToEntity(data: UpdateTagInputDto): TagsEntity {
		return new TagsEntity('', data.name, data.rated18, '', '')
	}
}
