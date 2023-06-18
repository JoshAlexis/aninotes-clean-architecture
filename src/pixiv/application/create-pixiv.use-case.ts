import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { CreatePixivInputDto } from 'pixiv/application/dto/create-pixiv-input.dto'
import { PixivTagEntity } from 'pixiv/domain/pixiv-tag.entity'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'

@Injectable()
export class CreatePixiv {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(data: CreatePixivInputDto): Promise<[PixivEntity, PixivTagEntity[]]> {
		const pixiv = await this.repository.createPixiv(this.mapToEntity(data))

		const tagsList: Array<PixivTagEntity> = []

		for (const { id } of data.tags) {
			const createdTags = await this.repository.assignTag(pixiv.id, id)
			tagsList.push(createdTags)
		}

		return [pixiv, tagsList]
	}

	private mapToEntity(data: CreatePixivInputDto): PixivEntity {
		return new PixivEntity(
			'',
			data.pixivName,
			data.idPixiv,
			data.link,
			data.example,
			data.hasR18Content,
			data.favorite,
			data.quality
		)
	}
}
