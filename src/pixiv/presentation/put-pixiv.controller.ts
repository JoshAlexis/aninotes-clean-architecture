import { Body, Controller, Param, Put } from '@nestjs/common'
import { UpdatePixiv } from 'pixiv/application/update-pixiv.use-case'
import { UpdatePixivInputDto } from 'pixiv/application/dto/update-pixiv-input.dto'

@Controller({
	version: '1',
	path: 'pixiv'
})
export class PutPixivController {
	constructor(private readonly updatePixiv: UpdatePixiv) {}

	@Put('/:id')
	async update(@Param('id') id: string, @Body() data: UpdatePixivInputDto) {
		return this.updatePixiv.run(id, data)
	}
}
