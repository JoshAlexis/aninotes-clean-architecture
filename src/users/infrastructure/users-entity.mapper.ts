import dayjs from 'dayjs'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserEntity } from 'users/domain/user.entity'

@Injectable()
export class UsersEntityMapper {
	toUserEntity(data: User): UserEntity {
		return new UserEntity(
			data.id,
			data.userName as string,
			data.email,
			data.password,
			dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss'),
			dayjs(data.updatedAt).format('YYYY-MM-DD HH:mm:ss')
		)
	}

	toUserEntityList(data: Array<User>): ReadonlyArray<UserEntity> {
		if (data.length === 0) return []
		return data.map((user) => this.toUserEntity(user))
	}
}
