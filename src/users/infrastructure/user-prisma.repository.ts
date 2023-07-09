import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'users/domain/users.repository'
import { UserEntity } from 'users/domain/user.entity'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { UsersEntityMapper } from 'users/infrastructure/users-entity.mapper'

@Injectable()
export class UserPrismaRepository implements UsersRepository {
	constructor(private readonly prismaService: PrismaService, private readonly mapper: UsersEntityMapper) {}
	async addUser(data: UserEntity): Promise<UserEntity> {
		const createdUser = await this.prismaService.user.create({
			data: {
				userName: data.userName,
				email: data.email,
				password: data.password
			}
		})

		return this.mapper.toUserEntity(createdUser)
	}

	async findUser(id: string): Promise<UserEntity | null> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		})

		if (user === null) return null

		return this.mapper.toUserEntity(user)
	}

	async updateUser(id: string, data: UserEntity): Promise<UserEntity> {
		const updatedUser = await this.prismaService.user.update({
			where: {
				id
			},
			data: {
				userName: data.userName,
				email: data.email,
				password: data.password
			}
		})

		return this.mapper.toUserEntity(updatedUser)
	}

	async findUserByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.prismaService.user.findFirst({
			where: {
				email
			}
		})

		if (user === null) return null

		return this.mapper.toUserEntity(user)
	}

	async fetchAll(): Promise<ReadonlyArray<UserEntity>> {
		const userList = await this.prismaService.user.findMany()

		return this.mapper.toUserEntityList(userList)
	}
}
