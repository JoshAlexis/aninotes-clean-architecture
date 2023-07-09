import { Inject, Injectable } from '@nestjs/common'
import { UsersTokens } from 'users/di/users.tokens'
import { UsersRepository } from 'users/domain/users.repository'
import { UserNotFoundError } from 'users/domain/user-not-found.error'

@Injectable()
export class GetUserById {
	constructor(@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository) {}

	async run(id: string) {
		const user = await this.repository.findUser(id)

		if (user === null) throw new UserNotFoundError()

		return user
	}
}
