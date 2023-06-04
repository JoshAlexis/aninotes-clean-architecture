import { Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from 'users/domain/users.repository'
import { UserDto } from 'users/domain/dto/user.dto'
import { CreateUserDto } from 'users/domain/dto/create-user.dto'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { UsersInfraMapper } from 'users/infrastructure/users-infra.mapper'
import { UpdateUserDto } from 'users/domain/dto'

@Injectable()
export class UserPrismaRepository implements UsersRepository {
	constructor(private readonly prismaService: PrismaService, private readonly mapper: UsersInfraMapper) {}
	async addUser(dto: CreateUserDto): Promise<UserDto> {
		const createdUser = await this.prismaService.user.create({
			data: {
				...dto
			}
		})

		return this.mapper.toUserDto(createdUser)
	}

	async updateUser(id: string, dto: UpdateUserDto): Promise<UserDto> {
		const foundUser = await this.prismaService.user.findUnique({
			where: {
				id
			}
		})

		if (!foundUser) {
			throw new NotFoundException('User not found')
		}

		const updatedUser = await this.prismaService.user.update({
			where: {
				id
			},
			data: {
				...dto
			}
		})

		return this.mapper.toUserDto(updatedUser)
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
