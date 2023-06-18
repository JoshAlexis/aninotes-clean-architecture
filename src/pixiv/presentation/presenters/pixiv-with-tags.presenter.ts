import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PixivTagsItemEntity } from 'pixiv/domain/pixiv-tags-item.entity'

export type PixivWithTagsPresenter = PixivEntity & {
	tags: ReadonlyArray<PixivTagsItemEntity>
}
