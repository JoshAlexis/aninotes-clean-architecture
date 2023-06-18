import { Inject, Injectable } from '@nestjs/common'
import { UsersTokens } from 'users/di/users.tokens'
import { UsersRepository } from 'users/domain/users.repository'
import { GetUserByEmailInputDto } from 'users/application/dto/get-user-by-email-input.dto'
import { UserEntity } from 'users/domain/user.entity'

@Injectable()
export class GetUserByEmail {
	constructor(@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository) {}

	run(data: GetUserByEmailInputDto): Promise<UserEntity> {
		return this.repository.findUserByEmail(data.email)
	}
}
