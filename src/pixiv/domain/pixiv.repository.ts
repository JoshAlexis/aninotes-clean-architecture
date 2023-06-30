import { PixivEntity } from './pixiv.entity'
import { BaseRepository } from 'shared/domain/base.repository'
import { PixivTagEntity } from 'pixiv/domain/pixiv-tag.entity'
import { PixivTagsItemEntity } from 'pixiv/domain/pixiv-tags-item.entity'

export interface PixivRepository extends BaseRepository<PixivEntity, PixivTagEntity> {
	createPixiv(data: PixivEntity): Promise<PixivEntity>
	updatePixiv(id: string, data: PixivEntity): Promise<PixivEntity>
	getByIdPixiv(idPixiv: number): Promise<PixivEntity | null>
	getPixivTags(id: string): Promise<ReadonlyArray<PixivTagsItemEntity>>
}
