import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'

@Injectable()
export class GetPixivByIdPixiv {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(idPixiv: number) {
		return this.repository.getByIdPixiv(idPixiv)
	}
}
