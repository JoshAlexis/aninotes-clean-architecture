import { Inject, Injectable } from '@nestjs/common'
import { TagsTokens } from 'tags/di/tags.tokens'
import { CreateTagInputDto } from 'tags/application/dto/create-tag-input.dto'
import { TagsEntity } from 'tags/domain/tags.entity'
import { TagsRepository } from 'tags/domain/tags.repository'

@Injectable()
export class CreateTag {
	constructor(@Inject(TagsTokens.TAGS_REPOSITORY) private readonly repository: TagsRepository) {}

	run(data: CreateTagInputDto): Promise<TagsEntity> {
		return this.repository.createTag(this.mapToEntity(data))
	}

	private mapToEntity(data: CreateTagInputDto): TagsEntity {
		return new TagsEntity('', data.name, data.rated18, '', '')
	}
}
