import { CreateUserDto } from 'users/domain/dto/create-user.dto'
import { UserDto } from 'users/domain/dto/user.dto'
import { UpdateUserDto } from 'users/domain/dto/update-user.dto'

export interface UsersRepository {
	addUser(dto: CreateUserDto): Promise<UserDto>
	updateUser(id: string, dto: UpdateUserDto): Promise<UserDto>
	findUserByEmail(email: string): Promise<UserDto>
	fetchAll(): Promise<ReadonlyArray<UserDto>>
}
