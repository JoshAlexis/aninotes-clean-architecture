import { CreateUser } from 'users/application/create-user.use-case'
import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from 'users/domain/dto'
import { GetUserByEmailDto } from 'users/application/dto/get-user-by-email.dto'
import { GetUserByEmail } from 'users/application/get-user-by-email.use-case'

@Controller({
	version: '1',
	path: 'users'
})
export class PostUsersController {
	constructor(private readonly createUser: CreateUser, private readonly getUserByEmail: GetUserByEmail) {}

	@Post('/email')
	fetchByEmail(@Body() body: GetUserByEmailDto) {
		return this.getUserByEmail.run(body)
	}

	@Post('/')
	create(@Body() body: CreateUserDto) {
		return this.createUser.run(body)
	}
}
