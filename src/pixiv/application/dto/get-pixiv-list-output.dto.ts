import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PixivTagsItemEntity } from 'pixiv/domain/pixiv-tags-item.entity'

export interface GetPixivListOutputDto {
	pixiv: PixivEntity
	tags: ReadonlyArray<PixivTagsItemEntity>
}
