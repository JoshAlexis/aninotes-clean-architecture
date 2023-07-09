// eslint-disable-next-line prettier/prettier
import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { GetAllUsers } from 'users/application/get-all-users.use-case'
import { GetUserById } from 'users/application/get-user-by-id.use-case'
import { UsersErrorInterceptor } from 'users/presentation/interceptors/users-error.interceptor'

@UseInterceptors(UsersErrorInterceptor)
@Controller({
	version: '1',
	path: 'users'
})
export class GetUsersController {
	constructor(private readonly getAllUsers: GetAllUsers, private readonly getUserById: GetUserById) {}

	@Get('/:id')
	getUser(@Param() id: string) {
		return this.getUserById.run(id)
	}

	@Get('')
	fetchAll() {
		return this.getAllUsers.run()
	}
}
