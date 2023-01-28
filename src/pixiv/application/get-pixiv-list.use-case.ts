import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'

@Injectable()
export class GetPixivList {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(page: number, size: number): Promise<PixivEntity[]> {
		return this.repository.getAll(page, size)
	}
}
