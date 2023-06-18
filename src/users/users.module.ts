import { Module } from '@nestjs/common'
import { UsersTokens } from 'users/di/users.tokens'
import { GetUsersController } from 'users/presentation/get-users.controller'
import { PostUsersController } from 'users/presentation/post-users.controller'
import { CreateUser } from 'users/application/create-user.use-case'
import { GetAllUsers } from 'users/application/get-all-users.use-case'
import { GetUserByEmail } from 'users/application/get-user-by-email.use-case'
import { UserPrismaRepository } from 'users/infrastructure/user-prisma.repository'
import { UsersEntityMapper } from 'users/infrastructure/users-entity.mapper'
import { PutUsersController } from 'users/presentation/put-users.controller'
import { UpdateUser } from 'users/application/update-user.use-case'
import { UsersDtoEntityMapper } from 'users/application/dto/users-dto-entity.mapper'

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
		UsersEntityMapper,
		UsersDtoEntityMapper
	]
})
export class UsersModule {}
