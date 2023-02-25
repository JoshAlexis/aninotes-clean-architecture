import { Inject } from '@nestjs/common'
import { TagsTokens } from 'tags/di/tags.tokens'
import { TagEntity } from 'tags/domain/tag.entity'
import { TagsRepository } from 'tags/domain/tags.repository'
import { UpdateTagDto } from 'tags/domain/dto/update-tag.dto'

export class UpdateTag {
	constructor(@Inject(TagsTokens.TAGS_REPOSITORY) private readonly repository: TagsRepository<TagEntity>) {}

	run(id: string, data: UpdateTagDto): Promise<TagEntity> {
		return this.repository.updateTag(id, data)
	}
}
