import { Inject, Injectable } from '@nestjs/common'
import { UsersTokens } from 'users/di/users.tokens'
import { UsersRepository } from 'users/domain/users.repository'
import { UpdateUserDto } from 'users/domain/dto'

@Injectable()
export class UpdateUser {
	constructor(@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository) {}

	run(id: string, data: UpdateUserDto) {
		return this.repository.updateUser(id, data)
	}
}
