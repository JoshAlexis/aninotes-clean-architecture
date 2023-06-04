import { Inject, Injectable } from '@nestjs/common'
import { UsersTokens } from 'users/di/users.tokens'
import { UsersRepository } from 'users/domain/users.repository'
import { GetUserByEmailDto } from 'users/application/dto/get-user-by-email.dto'
import { UserDto } from 'users/domain/dto'

@Injectable()
export class GetUserByEmail {
	constructor(@Inject(UsersTokens.USER_REPOSITORY) private readonly repository: UsersRepository) {}

	run(data: GetUserByEmailDto): Promise<UserDto> {
		return this.repository.findUserByEmail(data.email)
	}
}
