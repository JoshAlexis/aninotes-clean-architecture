import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GetAllTags } from 'tags/application/get-all-tags.use-case'
import { GetTag } from 'tags/application/get-tag.use-case'
import { TagsErrorInterceptor } from 'tags/presentation/interceptors/tags-error.interceptor'

@UseInterceptors(TagsErrorInterceptor)
@ApiTags('tags')
@Controller({
	version: '1',
	path: 'tags'
})
export class GetTagsController {
	constructor(private readonly getAllTags: GetAllTags, private readonly getTag: GetTag) {}

	@Get('/')
	findAll() {
		return this.getAllTags.run()
	}

	@Get('/:id')
	findById(@Param('id') id: string) {
		return this.getTag.run(id)
	}
}
