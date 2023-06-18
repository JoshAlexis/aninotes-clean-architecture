import { Body, Controller, Param, Put } from '@nestjs/common'
import { UpdateTag } from 'tags/application/update-tag.use-case'
import { UpdateTagInputDto } from 'tags/application/dto/update-tag-input.dto'

@Controller({
	version: '1',
	path: 'tags'
})
export class PutTagsController {
	constructor(private readonly updateTag: UpdateTag) {}

	@Put('/:id')
	put(@Param('id') id: string, @Body() data: UpdateTagInputDto) {
		return this.updateTag.run(id, data)
	}
}
