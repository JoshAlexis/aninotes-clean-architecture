import { Injectable } from '@nestjs/common'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PixivTagsDto } from 'pixiv/domain/dto/pixiv-tags.dto'
import { PixivWithTagsPresenter } from 'pixiv/presentation/presenters/pixiv-with-tags.presenter'
import { PixivEntityWithTagsDto } from 'pixiv/application/dto/PixivEntityWithTagsDto'

@Injectable()
export class PixivPresenterMapper {
	toPixivWithTags(data: [PixivEntity, ReadonlyArray<PixivTagsDto>]): PixivWithTagsPresenter {
		const [pixiv, pixivTags] = data

		return {
			...pixiv,
			tags: pixivTags
		}
	}

	toPixivWithTagsList(data: ReadonlyArray<PixivEntityWithTagsDto>): ReadonlyArray<PixivWithTagsPresenter> {
		return data.map((dto) => ({
			...dto.pixiv,
			tags: dto.tags
		}))
	}
}
