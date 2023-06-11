import { Inject, Injectable } from '@nestjs/common'
import { UsersRepository } from 'users/domain/users.repository'
import { UsersTokens } from 'users/di/users.tokens'
import { UserEntity } from 'users/domain/user.entity'
import { CreateUserDto, UsersDtoEntityMapper } from 'users/application/dto'

@Injectable()
export class CreateUser {
	constructor(
		@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository,
		private readonly mapper: UsersDtoEntityMapper
	) {}

	run = (data: CreateUserDto): Promise<UserEntity> => this.repository.addUser(this.mapper.toEntity(data));
}
