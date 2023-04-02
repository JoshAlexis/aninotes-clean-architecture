import { Pixiv, PixivTags } from '@prisma/client'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { Injectable } from '@nestjs/common'
import { PixivTagEntity } from 'pixiv/domain/pixiv-tag.entity'
import { PixivWithTags } from 'pixiv/infrastructure/pixiv-with-tags.type'
import { PixivTagsDto } from 'pixiv/domain/dto/pixiv-tags.dto'

@Injectable()
export class PixivEntityMapper {
	toEntity(data: Pixiv): PixivEntity {
		return {
			id: data.id,
			pixivName: data.pixivName ?? 'In Japanese',
			idPixiv: data.idPixiv,
			link: data.link,
			quality: data.quality,
			favorite: data.favorite,
			example: data.example,
			hasR18Content: data.hasR18Content
		}
	}

	toEntityList(dataList: Pixiv[]): PixivEntity[] {
		if (dataList.length === 0) return []
		return dataList.map((data) => ({
			id: data.id,
			pixivName: data.pixivName ?? 'In Japanese',
			idPixiv: data.idPixiv,
			link: data.link,
			quality: data.quality,
			favorite: data.favorite,
			example: data.example,
			hasR18Content: data.hasR18Content
		}))
	}

	toPixivTagEntity(data: PixivTags): PixivTagEntity {
		return {
			id: data.id,
			idPixiv: data.pixivId ?? '',
			idTag: data.tagId ?? ''
		}
	}

	toPixivWithTags(data: PixivWithTags): ReadonlyArray<PixivTagsDto> {
		return data.tags.map((tag) => {
			return {
				idPixivTag: tag.id,
				name: tag.tag?.name as string
			}
		})
	}
}
