import { Body, Controller, Param, Put } from '@nestjs/common'
import { UpdateUser } from 'users/application/update-user.use-case'
import { UpdateUserDto } from 'users/application/dto'

@Controller({
	version: 'v1',
	path: 'users'
})
export class PutUsersController {
	constructor(private readonly updateUser: UpdateUser) {}

	@Put('/:id')
	update(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.updateUser.run(id, body)
	}
}
