import { Pixiv, PixivTags } from '@prisma/client'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { Injectable } from '@nestjs/common'
import { PixivTagEntity } from 'pixiv/domain/pixiv-tag.entity'
import { PixivWithTagsDto } from 'pixiv/infrastructure/pixiv-with-tags.dto'
import { PixivTagsItemEntity } from 'pixiv/domain/pixiv-tags-item.entity'

@Injectable()
export class PixivEntityMapper {
	toEntity(data: Pixiv): PixivEntity {
		return new PixivEntity(
			data.id,
			data.pixivName as string,
			data.idPixiv,
			data.link,
			data.example,
			data.hasR18Content,
			data.favorite,
			data.quality
		)
	}

	toEntityList(dataList: Pixiv[]): PixivEntity[] {
		if (dataList.length === 0) return []
		return dataList.map((data) => this.toEntity(data))
	}

	toPixivTagEntity(data: PixivTags): PixivTagEntity {
		return new PixivTagEntity(data.id, data.pixivId as string, data.tagId as string)
	}

	toPixivItemTagsEntity(data: PixivWithTagsDto): ReadonlyArray<PixivTagsItemEntity> {
		if (data === null || data === undefined) return []
		return data.tags.map((tag) => {
			return new PixivTagsItemEntity(tag.id, tag.tag?.name as string)
		})
	}
}
