import { Injectable } from '@nestjs/common'
import { CreateUserDto } from 'users/application/dto/create-user.dto'
import { UpdateUserDto } from 'users/application/dto/update-user.dto'
import { UserEntity } from 'users/domain/user.entity'

@Injectable()
export class UsersDtoEntityMapper {
	toEntity(dto: CreateUserDto | UpdateUserDto): UserEntity {
		if (dto instanceof CreateUserDto) {
			return new UserEntity(undefined, dto.userName, dto.email, dto.password, undefined, undefined)
		}
		return new UserEntity(
			undefined,
			dto.userName as string,
			dto.email as string,
			dto.password as string,
			undefined,
			undefined
		)
	}
}
