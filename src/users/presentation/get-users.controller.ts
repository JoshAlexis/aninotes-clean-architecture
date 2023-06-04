import { Controller, Get } from '@nestjs/common'
import { GetAllUsers } from 'users/application/get-all-users.use-case'

@Controller({
	version: '1',
	path: 'users'
})
export class GetUsersController {
	constructor(private readonly getAllUsers: GetAllUsers) {}

	@Get('')
	fetchAll() {
		return this.getAllUsers.run()
	}
}
