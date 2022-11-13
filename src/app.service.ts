import { Injectable, Res } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
export class AppService {
	getHello(@Res() response: Response): Response {
		return response.json({ message: 'Aninotes API' })
	}
}
