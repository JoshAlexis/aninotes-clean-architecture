import { Injectable } from '@nestjs/common'
import { Tag } from '@prisma/client'
import dayjs from 'dayjs'
import { TagsEntity } from 'tags/domain/tags.entity'

@Injectable()
export class TagsEntityMapper {
	toTagEntity(model: Tag) {
		return new TagsEntity(
			model.id,
			model.name,
			model.rated18,
			dayjs(model.createdAt).format('YYYY-MM-DD'),
			dayjs(model.updatedAt).format('YYYY-MM-DD')
		)
	}

	toTagEntityList(modelList: Tag[]) {
		return modelList.map((tagItem) => this.toTagEntity(tagItem))
	}
}
