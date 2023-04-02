import { Controller, Param, Post } from '@nestjs/common'
import { AssignTagToPixiv } from 'pixiv/application/assign-tag-pixiv.use-case'

@Controller({
	version: '1',
	path: 'pixiv'
})
export class PostPixivTagsController {
	constructor(private readonly assignTag: AssignTagToPixiv) {}

	@Post('/:idPixiv/tag/:idTag')
	assignTagToPixiv(@Param('idPixiv') idPixiv: string, @Param('idTag') idTag: string) {
		return this.assignTag.run(idPixiv, idTag)
	}
}
