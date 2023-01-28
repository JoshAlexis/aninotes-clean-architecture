import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'

@Injectable()
export class RemoveTagFromPixiv {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	async run(idRelationship: number) {
		return this.repository.deleteTag(idRelationship)
	}
}
