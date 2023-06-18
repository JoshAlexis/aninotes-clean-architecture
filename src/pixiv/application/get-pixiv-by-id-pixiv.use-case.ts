import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivTagsItemEntity } from 'pixiv/domain/pixiv-tags-item.entity'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'

@Injectable()
export class GetPixivByIdPixiv {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(idPixiv: number): Promise<[PixivEntity, ReadonlyArray<PixivTagsItemEntity>]> {
		const pixiv = await this.repository.getByIdPixiv(idPixiv)
		const pixivTags = await this.repository.getPixivTags(pixiv.id)
		return [pixiv, pixivTags]
	}
}
