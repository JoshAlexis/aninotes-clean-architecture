import { Body, Controller, Post } from '@nestjs/common'
import { CreatePixiv } from 'pixiv/application/create-pixiv.use-case'
import { CreatePixivDto } from 'pixiv/domain/dto/create-pixiv.dto'

@Controller({
	version: '1',
	path: 'pixiv'
})
export class PostPixivController {
	constructor(private readonly createPixiv: CreatePixiv) {}

	@Post()
	async create(@Body() data: CreatePixivDto) {
		return this.createPixiv.run(data)
	}
}
