import { Inject, Injectable } from '@nestjs/common'
import { UsersTokens } from 'users/di/users.tokens'
import { UsersRepository } from 'users/domain/users.repository'
import { UpdateUserDto, UsersDtoEntityMapper } from 'users/application/dto'

@Injectable()
export class UpdateUser {
	constructor(
		@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository,
		private readonly mapper: UsersDtoEntityMapper
	) {}

	run(id: string, data: UpdateUserDto) {
		return this.repository.updateUser(id, this.mapper.toEntity(data))
	}
}
