import { CreateUser } from 'users/application/create-user.use-case'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { GetUserByEmailInputDto } from 'users/application/dto/get-user-by-email-input.dto'
import { GetUserByEmail } from 'users/application/get-user-by-email.use-case'
import { CreateUserInputDto } from 'users/application/dto'

@Controller({
	version: '1',
	path: 'users'
})
export class PostUsersController {
	constructor(private readonly createUser: CreateUser, private readonly getUserByEmail: GetUserByEmail) {}

	@HttpCode(HttpStatus.OK)
	@Post('/email')
	fetchByEmail(@Body() body: GetUserByEmailInputDto) {
		return this.getUserByEmail.run(body)
	}

	@Post('/')
	create(@Body() body: CreateUserInputDto) {
		return this.createUser.run(body)
	}
}
