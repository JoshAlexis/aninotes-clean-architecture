import { Body, Controller, Post } from '@nestjs/common'
import { CreateTag } from 'tags/application/create-tag.use-case'
import { CreateTagDto } from 'tags/domain/dto/create-tag.dto'

@Controller({
	version: '1',
	path: 'tags'
})
export class PostTagsController {
	constructor(private readonly createTag: CreateTag) {}

	@Post('/')
	post(@Body() createTagDto: CreateTagDto) {
		return this.createTag.run(createTagDto)
	}
}
