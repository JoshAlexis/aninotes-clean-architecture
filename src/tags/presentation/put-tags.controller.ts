import { Body, Controller, Param, Put, UseInterceptors } from "@nestjs/common";
import { UpdateTag } from 'tags/application/update-tag.use-case'
import { UpdateTagInputDto } from 'tags/application/dto/update-tag-input.dto'
import { TagsErrorInterceptor } from 'tags/presentation/interceptors/tags-error.interceptor'

@UseInterceptors(TagsErrorInterceptor)
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
