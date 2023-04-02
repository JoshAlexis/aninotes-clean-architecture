import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { PixivEntityWithTagsDto } from 'pixiv/application/dto/PixivEntityWithTagsDto'

@Injectable()
export class GetPixivList {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(page: number, size: number): Promise<Array<PixivEntityWithTagsDto>> {
		const pixivList = await this.repository.getAll(page, size)

		const pixivResponse: Array<PixivEntityWithTagsDto> = []

		for (const pixivItem of pixivList) {
			const pixivWithTags: PixivEntityWithTagsDto = {
				pixiv: pixivItem,
				tags: []
			}
			pixivWithTags.tags = await this.repository.getPixivTags(pixivItem.id)

			pixivResponse.push(pixivWithTags)
		}

		return pixivResponse
	}
}
