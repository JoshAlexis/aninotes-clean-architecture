import { Body, Controller, Post } from '@nestjs/common'
import { CreateTag } from 'tags/application/create-tag.use-case'
import { CreateTagInputDto } from 'tags/application/dto/create-tag-input.dto'

@Controller({
	version: '1',
	path: 'tags'
})
export class PostTagsController {
	constructor(private readonly createTag: CreateTag) {}

	@Post('/')
	post(@Body() createTagDto: CreateTagInputDto) {
		return this.createTag.run(createTagDto)
	}
}
