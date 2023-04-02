import { PixivEntity } from './pixiv.entity'
import { CreatePixivDto } from 'pixiv/domain/dto/create-pixiv.dto'
import { UpdatePixivDto } from 'pixiv/domain/dto/update-pixiv.dto'
import { BaseRepository } from 'shared/domain/base.repository'
import { PixivTagEntity } from 'pixiv/domain/pixiv-tag.entity'
import { PixivTagsDto } from 'pixiv/domain/dto/pixiv-tags.dto'

export interface PixivRepository extends BaseRepository<PixivEntity, PixivTagEntity> {
	createPixiv(data: CreatePixivDto): Promise<PixivEntity>
	updatePixiv(id: string, data: UpdatePixivDto): Promise<PixivEntity>
	getByIdPixiv(idPixiv: number): Promise<PixivEntity>
	getPixivTags(id: string): Promise<ReadonlyArray<PixivTagsDto>>
}
