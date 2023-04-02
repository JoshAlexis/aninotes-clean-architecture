import { RemoveTagFromPixiv } from 'pixiv/application/remove-tag-pixiv.use-case'
import { Controller, Delete, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common'
import { BooleanResponseInterceptor } from 'pixiv/presentation/interceptors/boolean-response.interceptor'

@Controller({
	path: 'pixiv',
	version: '1'
})
export class DeletePixivTagsController {
	constructor(private readonly removeTag: RemoveTagFromPixiv) {}

	@UseInterceptors(BooleanResponseInterceptor)
	@Delete('/tag/:idRelation')
	removeTagFromPixiv(@Param('idRelation') idRelation: string) {
		return this.removeTag.run(idRelation)
	}
}
