import { Inject } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'

export class AssignTagToPixiv {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(idPixiv: number, idTag: number) {
		return this.repository.assignTag(idPixiv, idTag)
	}
}
