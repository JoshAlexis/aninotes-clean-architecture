import { Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from 'users/domain/users.repository'
import { UserDto } from 'users/domain/dto/user.dto'
import { CreateUserDto } from 'users/domain/dto/create-user.dto'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { UsersInfraMapper } from 'users/infrastructure/users-infra.mapper'

@Injectable()
export class UserPrismaRepository implements UsersRepository {
	constructor(private readonly prismaService: PrismaService, private readonly mapper: UsersInfraMapper) {}
	async addUser(dto: CreateUserDto): Promise<UserDto> {
		const createdUser = await this.prismaService.user.create({
			data: {
				userName: dto.userName,
				email: dto.email,
				password: dto.password
			}
		})

		return this.mapper.toUserDto(createdUser)
	}

	async findUserByEmail(email: string): Promise<UserDto> {
		const user = await this.prismaService.user.findFirst({
			where: {
				email
			}
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return this.mapper.toUserDto(user)
	}

	async fetchAll(): Promise<ReadonlyArray<UserDto>> {
		const userList = await this.prismaService.user.findMany()

		return this.mapper.toUserDtoList(userList)
	}
}
