import { Injectable } from '@nestjs/common'
import { Tag } from '@prisma/client'
import { TagEntity } from 'tags/domain/tag.entity'
import dayjs from 'dayjs'

@Injectable()
export class TagsEntityMapper {
	toTagEntity(model: Tag) {
		const tagEntity = {} as TagEntity

		tagEntity.id = model.id
		tagEntity.name = model.name
		tagEntity.rated18 = model.rated18
		tagEntity.createdAt = dayjs(model.createdAt).format('YYYY-MM-DD')
		tagEntity.updatedAt = dayjs(model.updatedAt).format('YYYY-MM-DD')

		return tagEntity
	}

	toTagEntityList(modelList: Tag[]) {
		const tagEntityList: TagEntity[] = []

		for (const tagItem of modelList) {
			const tagEntity = {} as TagEntity

			tagEntity.id = tagItem.id
			tagEntity.name = tagItem.name
			tagEntity.rated18 = tagItem.rated18
			tagEntity.createdAt = tagEntity.createdAt
			tagEntity.updatedAt = tagEntity.updatedAt

			tagEntityList.push(tagEntity)
		}

		return tagEntityList
	}
}
