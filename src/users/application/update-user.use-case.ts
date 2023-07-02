import { Inject, Injectable } from '@nestjs/common'
import { UsersTokens } from 'users/di/users.tokens'
import { UsersRepository } from 'users/domain/users.repository'
import { UpdateUserInputDto, UsersDtoEntityMapper } from 'users/application/dto'
import { UserNotFoundError } from 'users/domain/user-not-found.error'

@Injectable()
export class UpdateUser {
	constructor(
		@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository,
		private readonly mapper: UsersDtoEntityMapper
	) {}

	async run(id: string, data: UpdateUserInputDto) {
		const user = await this.repository.findUser(id)

		if (user === null) throw new UserNotFoundError()

		return this.repository.updateUser(id, this.mapper.toEntity(data))
	}
}
