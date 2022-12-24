import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { GetPixivList } from 'pixiv/application/get-pixiv-list.use-case'
import { GetPixivById } from 'pixiv/application/get-pixiv-by-id.use-case'
import { GetPixivByIdPixiv } from 'pixiv/application/get-pixiv-by-id-pixiv.use-case'

@Controller({
	version: '1',
	path: 'pixiv'
})
export class GetPixivController {
	constructor(
		private readonly getPixivList: GetPixivList,
		private readonly getPixivById: GetPixivById,
		private readonly getPixivByIdPixiv: GetPixivByIdPixiv
	) {}

	@Get('/')
	async getList(@Query('page', ParseIntPipe) page: number, @Query('size', ParseIntPipe) size: number) {
		return this.getPixivList.run(page, size)
	}

	@Get('/:id')
	async getById(@Param('id', ParseIntPipe) id: number) {
		return this.getPixivById.run(id)
	}

	@Get('/id-pixiv/:idPixiv')
	async getByIdPixiv(@Param('idPixiv', ParseIntPipe) idPixiv: number) {
		return this.getPixivByIdPixiv.run(idPixiv)
	}
}
