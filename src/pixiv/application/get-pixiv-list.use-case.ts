import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { GetPixivListOutputDto } from 'pixiv/application/dto/get-pixiv-list-output.dto'

@Injectable()
export class GetPixivList {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(page: number, size: number): Promise<Array<GetPixivListOutputDto>> {
		const pixivList = await this.repository.getAll(page, size)

		const pixivResponse: Array<GetPixivListOutputDto> = []

		for (const pixivItem of pixivList) {
			const pixivWithTags: GetPixivListOutputDto = {
				pixiv: pixivItem,
				tags: []
			}
			pixivWithTags.tags = await this.repository.getPixivTags(pixivItem.id)

			pixivResponse.push(pixivWithTags)
		}

		return pixivResponse
	}
}
