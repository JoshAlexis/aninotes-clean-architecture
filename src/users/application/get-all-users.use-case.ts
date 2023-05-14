import { Inject, Injectable } from '@nestjs/common'
import { UsersTokens } from 'users/di/users.tokens'
import { UsersRepository } from 'users/domain/users.repository'
import { UserDto } from 'users/domain/dto'

@Injectable()
export class GetAllUsers {
	constructor(@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository) {}

	run(): Promise<ReadonlyArray<UserDto>> {
		return this.repository.fetchAll()
	}
}
