import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common'
import { UpdatePixiv } from 'pixiv/application/update-pixiv.use-case'
import { UpdatePixivDto } from 'pixiv/domain/dto/update-pixiv.dto'

@Controller({
	version: '1',
	path: 'pixiv'
})
export class PutPixivController {
	constructor(private readonly updatePixiv: UpdatePixiv) {}

	@Put('/:id')
	async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePixivDto) {
		return this.updatePixiv.run(id, data)
	}
}
