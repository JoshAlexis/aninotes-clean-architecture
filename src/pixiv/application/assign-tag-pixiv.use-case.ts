import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'

@Injectable()
export class AssignTagToPixiv {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(idPixiv: string, idTag: string) {
		return this.repository.assignTag(idPixiv, idTag)
	}
}
