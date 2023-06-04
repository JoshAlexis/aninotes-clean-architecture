import { Inject, Injectable } from '@nestjs/common'
import { UsersRepository } from 'users/domain/users.repository'
import { UsersTokens } from 'users/di/users.tokens'
import { CreateUserDto, UserDto } from 'users/domain/dto'

@Injectable()
export class CreateUser {
	constructor(@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository) {}

	run(data: CreateUserDto): Promise<UserDto> {
		return this.repository.addUser(data)
	}
}
