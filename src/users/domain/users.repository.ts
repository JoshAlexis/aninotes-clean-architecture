import { UserEntity } from 'users/domain/user.entity'

export interface UsersRepository {
	addUser(data: UserEntity): Promise<UserEntity>
	updateUser(id: string, user: UserEntity): Promise<UserEntity>
	findUserByEmail(email: string): Promise<UserEntity>
	fetchAll(): Promise<ReadonlyArray<UserEntity>>
}
