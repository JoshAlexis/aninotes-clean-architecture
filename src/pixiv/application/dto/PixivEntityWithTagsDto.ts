import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PixivTagsDto } from 'pixiv/domain/dto/pixiv-tags.dto'

export interface PixivEntityWithTagsDto {
	pixiv: PixivEntity
	tags: ReadonlyArray<PixivTagsDto>
}
