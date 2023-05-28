import { Module } from '@nestjs/common'
import { UsersTokens } from 'users/di/users.tokens'
import { GetUsersController } from 'users/presentation/get-users.controller'
import { PostUsersController } from 'users/presentation/post-users.controller'
import { CreateUser } from 'users/application/create-user.use-case'
import { GetAllUsers } from 'users/application/get-all-users.use-case'
import { GetUserByEmail } from 'users/application/get-user-by-email.use-case'
import { UserPrismaRepository } from 'users/infrastructure/user-prisma.repository'
import { UsersInfraMapper } from 'users/infrastructure/users-infra.mapper'
import { PutUsersController } from 'users/presentation/put-users.controller'
import { UpdateUser } from 'users/application/update-user.use-case'

@Module({
	controllers: [GetUsersController, PostUsersController, PutUsersController],
	providers: [
		CreateUser,
		GetAllUsers,
		GetUserByEmail,
		UpdateUser,
		{
			provide: UsersTokens.USER_REPOSITORY,
			useClass: UserPrismaRepository
		},
		UsersInfraMapper
	]
})
export class UsersModule {}
