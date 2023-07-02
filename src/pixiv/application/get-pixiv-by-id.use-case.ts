import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PixivTagsItemEntity } from 'pixiv/domain/pixiv-tags-item.entity'
import { PixivNotFoundError } from 'pixiv/domain/errors/pixiv-not-found.error'

@Injectable()
export class GetPixivById {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(id: string): Promise<[PixivEntity, ReadonlyArray<PixivTagsItemEntity>]> {
		const pixiv = await this.repository.getById(id)

		if (pixiv === null) throw new PixivNotFoundError(id)

		const pixivTags = await this.repository.getPixivTags(id)


		return [pixiv, pixivTags]
	}
}
