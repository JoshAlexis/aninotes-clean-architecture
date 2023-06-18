import { Injectable } from '@nestjs/common'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PixivTagsItemEntity } from 'pixiv/domain/pixiv-tags-item.entity'
import { PixivWithTagsPresenter } from 'pixiv/presentation/presenters/pixiv-with-tags.presenter'
import { GetPixivListOutputDto } from 'pixiv/application/dto/get-pixiv-list-output.dto'

@Injectable()
export class PixivPresenterMapper {
	toPixivWithTags(data: [PixivEntity, ReadonlyArray<PixivTagsItemEntity>]): PixivWithTagsPresenter {
		const [pixiv, pixivTags] = data

		return {
			...pixiv,
			tags: pixivTags
		}
	}

	toPixivWithTagsList(data: ReadonlyArray<GetPixivListOutputDto>): ReadonlyArray<PixivWithTagsPresenter> {
		return data.map((dto) => ({
			...dto.pixiv,
			tags: dto.tags
		}))
	}
}
