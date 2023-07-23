import { Inject, Injectable } from '@nestjs/common'
import { UsersRepository } from 'users/domain/users.repository'
import { UsersTokens } from 'users/di/users.tokens'
import { UserEntity } from 'users/domain/user.entity'
import { CreateUserInputDto, UsersDtoEntityMapper } from 'users/application/dto'
import { PasswordHashingService } from 'users/application/services/password-hashing.service'

@Injectable()
export class CreateUser {
	constructor(
		@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository,
		@Inject(UsersTokens.PASSWORD_HASHING_SERVICE) private readonly passHashing: PasswordHashingService,
		private readonly mapper: UsersDtoEntityMapper
	) {}

	async run(data: CreateUserInputDto): Promise<UserEntity> {
		const hash = await this.passHashing.hash(data.password)

		const updatedData: CreateUserInputDto = {
			...data,
			password: hash
		}

		return this.repository.addUser(this.mapper.toEntity(updatedData))
	}
}
