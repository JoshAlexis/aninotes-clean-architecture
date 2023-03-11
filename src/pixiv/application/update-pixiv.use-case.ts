import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { UpdatePixivDto } from 'pixiv/domain/dto/update-pixiv.dto'

@Injectable()
export class UpdatePixiv {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	run(id: string, data: UpdatePixivDto) {
		return this.repository.updatePixiv(id, data)
	}
}
