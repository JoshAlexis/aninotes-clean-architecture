import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { GetPixivList } from 'pixiv/application/get-pixiv-list.use-case'
import { GetPixivById } from 'pixiv/application/get-pixiv-by-id.use-case'
import { GetPixivByIdPixiv } from 'pixiv/application/get-pixiv-by-id-pixiv.use-case'
import { PixivPresenterMapper } from './presenters/pixiv-presenter.mapper'

@Controller({
	version: '1',
	path: 'pixiv'
})
export class GetPixivController {
	constructor(
		private readonly getPixivList: GetPixivList,
		private readonly getPixivById: GetPixivById,
		private readonly getPixivByIdPixiv: GetPixivByIdPixiv,
		private readonly mapper: PixivPresenterMapper
	) {}

	@Get('/')
	async getList(@Query('page', ParseIntPipe) page: number, @Query('size', ParseIntPipe) size: number) {
		const response = await this.getPixivList.run(page, size)
		return this.mapper.toPixivWithTagsList(response)
	}

	@Get('/:id')
	async getById(@Param('id') id: string) {
		const response = await this.getPixivById.run(id)
		return this.mapper.toPixivWithTags(response)
	}

	@Get('/id-pixiv/:idPixiv')
	async getByIdPixiv(@Param('idPixiv', ParseIntPipe) idPixiv: number) {
		const response = await this.getPixivByIdPixiv.run(idPixiv)
		return this.mapper.toPixivWithTags(response)
	}
}
