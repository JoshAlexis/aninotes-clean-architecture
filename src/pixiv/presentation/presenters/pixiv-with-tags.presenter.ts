import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PixivTagsDto } from 'pixiv/domain/dto/pixiv-tags.dto'

export type PixivWithTagsPresenter = PixivEntity & {
	tags: ReadonlyArray<PixivTagsDto>
}
