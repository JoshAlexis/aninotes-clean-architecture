import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivTagsDto } from 'pixiv/domain/dto/pixiv-tags.dto'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'

@Injectable()
export class GetPixivByIdPixiv {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(idPixiv: number): Promise<[PixivEntity, ReadonlyArray<PixivTagsDto>]> {
		const pixiv = await this.repository.getByIdPixiv(idPixiv)
		const pixivTags = await this.repository.getPixivTags(pixiv.id)
		return [pixiv, pixivTags]
	}
}
