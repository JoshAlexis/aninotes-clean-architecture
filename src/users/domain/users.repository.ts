import { UserEntity } from 'users/domain/user.entity'

export interface UsersRepository {
	addUser(data: UserEntity): Promise<UserEntity>
	updateUser(id: string, user: UserEntity): Promise<UserEntity>
	findUser(id: string): Promise<UserEntity | null>
	findUserByEmail(email: string): Promise<UserEntity | null>
	fetchAll(): Promise<ReadonlyArray<UserEntity>>
}
