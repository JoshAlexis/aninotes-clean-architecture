import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { AppService } from './app.service'

@Controller({
	version: '1'
})
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(@Res() response: Response) {
		return this.appService.getHello(response)
	}
}
