import { Inject, Injectable } from '@nestjs/common'
import { UsersTokens } from 'users/di/users.tokens'
import { UsersRepository } from 'users/domain/users.repository'
import { GetUserByEmailInputDto } from 'users/application/dto/get-user-by-email-input.dto'
import { UserEntity } from 'users/domain/user.entity'
import { UserNotFoundError } from 'users/domain/user-not-found.error'

@Injectable()
export class GetUserByEmail {
	constructor(@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository) {}

	async run(data: GetUserByEmailInputDto): Promise<UserEntity> {
		const user = await this.repository.findUserByEmail(data.email)

		if (user === null) throw new UserNotFoundError()

		return user
	}
}
