import { Inject, Injectable } from '@nestjs/common'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { UpdatePixivInputDto } from 'pixiv/application/dto/update-pixiv-input.dto'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'

@Injectable()
export class UpdatePixiv {
	constructor(@Inject(PixivTokens.PIXIV_REPOSITORY) private readonly repository: PixivRepository) {}

	run(id: string, data: UpdatePixivInputDto) {
		return this.repository.updatePixiv(id, this.mapToEntity(data))
	}

	private mapToEntity(data: UpdatePixivInputDto): PixivEntity {
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
