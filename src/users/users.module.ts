import { Module } from '@nestjs/common'
import { GetUsersController } from 'users/presentation/get-users.controller'
import { PostUsersController } from 'users/presentation/post-users.controller'
import { CreateUser } from 'users/application/create-user.use-case'
import { GetAllUsers } from 'users/application/get-all-users.use-case'
import { GetUserByEmail } from 'users/application/get-user-by-email.use-case'
import { UsersTokens } from 'users/di/users.tokens'
import { UserPrismaRepository } from 'users/infrastructure/user-prisma.repository'
import { UsersInfraMapper } from 'users/infrastructure/users-infra.mapper'

@Module({
	controllers: [GetUsersController, PostUsersController],
	providers: [
		CreateUser,
		GetAllUsers,
		GetUserByEmail,
		{
			provide: UsersTokens.USER_REPOSITORY,
			useClass: UserPrismaRepository
		},
		UsersInfraMapper
	]
})
export class UsersModule {}
