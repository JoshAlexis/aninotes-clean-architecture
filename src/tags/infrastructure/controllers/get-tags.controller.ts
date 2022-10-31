import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GetAllTags } from 'tags/application/get-all-tags.use-case'

@ApiTags('tags')
@Controller({
	version: '1',
	path: 'tags'
})
export class GetTagsController {
	constructor(private readonly getAllTags: GetAllTags) {}

	@Get('/')
	findAll() {
		return this.getAllTags.run()
	}
}
