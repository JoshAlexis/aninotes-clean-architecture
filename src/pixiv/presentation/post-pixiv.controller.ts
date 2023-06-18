import { Body, Controller, Post } from '@nestjs/common'
import { CreatePixiv } from 'pixiv/application/create-pixiv.use-case'
import { CreatePixivInputDto } from 'pixiv/application/dto/create-pixiv-input.dto'

@Controller({
	version: '1',
	path: 'pixiv'
})
export class PostPixivController {
	constructor(private readonly createPixiv: CreatePixiv) {}

	@Post()
	async create(@Body() data: CreatePixivInputDto) {
		return this.createPixiv.run(data)
	}
}
