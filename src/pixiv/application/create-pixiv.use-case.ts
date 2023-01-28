import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { CreatePixivDto } from 'pixiv/domain/dto/create-pixiv.dto'
import { PixivTagEntity } from 'pixiv/domain/pixiv-tag.entity'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'

@Injectable()
export class CreatePixiv {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(data: CreatePixivDto): Promise<[PixivEntity, PixivTagEntity[]]> {
		const pixiv = await this.repository.createPixiv(data)

		const tagsList: Array<PixivTagEntity> = []

		for (const { id } of data.tags) {
			const createdTags = await this.repository.assignTag(pixiv.id, id)
			tagsList.push(createdTags)
		}

		return [pixiv, tagsList]
	}
}
