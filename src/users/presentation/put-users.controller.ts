import { Body, Controller, Param, Put, UseInterceptors } from '@nestjs/common'
import { UpdateUser } from 'users/application/update-user.use-case'
import { UpdateUserInputDto } from 'users/application/dto'
import { UsersErrorInterceptor } from 'users/presentation/interceptors/users-error.interceptor'

@UseInterceptors(UsersErrorInterceptor)
@Controller({
	version: 'v1',
	path: 'users'
})
export class PutUsersController {
	constructor(private readonly updateUser: UpdateUser) {}

	@Put('/:id')
	update(@Param('id') id: string, @Body() body: UpdateUserInputDto) {
		return this.updateUser.run(id, body)
	}
}
