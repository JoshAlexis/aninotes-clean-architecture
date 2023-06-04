import dayjs from 'dayjs'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserDto } from 'users/domain/dto/user.dto'

@Injectable()
export class UsersInfraMapper {
	toUserDto(data: User): UserDto {
		return {
			id: data.id,
			email: data.email,
			userName: data.userName as string,
			createdAt: dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss'),
			updatedAt: dayjs(data.updatedAt).format('YYYY-MM-DD HH:mm:ss')
		}
	}

	toUserDtoList(data: Array<User>): ReadonlyArray<UserDto> {
		if (data.length === 0) return []
		return data.map((user) => this.toUserDto(user))
	}
}
