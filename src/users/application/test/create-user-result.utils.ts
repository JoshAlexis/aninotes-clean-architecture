import { User } from '@prisma/client'
import { v4 as uuid } from 'uuid'

export const createUserResult: User = {
	id: uuid(),
	email: 'user@gmail.com',
	password: '',
	userName: 'user1',
	createdAt: new Date(),
	updatedAt: new Date(),
	refreshToken: 'token'
}
