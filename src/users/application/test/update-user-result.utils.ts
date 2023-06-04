import { User } from '@prisma/client'
import { createUserResult } from 'users/application/test/create-user-result.utils'

export const updateUserResult: User = {
	...createUserResult,
	updatedAt: new Date(),
	email: 'new-user@gmail.com'
}
