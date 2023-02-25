import { PixivEntity } from 'pixiv/domain/pixiv.entity'

export type CreatePixivDto = Omit<PixivEntity, 'id'> & {
	tags: Array<{ id: string }>
}
