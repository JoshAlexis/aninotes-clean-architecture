import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PixivTagsDto } from 'pixiv/domain/dto/pixiv-tags.dto'

@Injectable()
export class GetPixivById {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(id: string): Promise<[PixivEntity, ReadonlyArray<PixivTagsDto>]> {
		const pixiv = await this.repository.getById(id)
		const pixivTags = await this.repository.getPixivTags(id)

		return [pixiv, pixivTags]
	}
}
