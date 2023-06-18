import { Injectable } from '@nestjs/common'
import { CreateUserInputDto } from 'users/application/dto/create-user-input.dto'
import { UpdateUserInputDto } from 'users/application/dto/update-user-input.dto'
import { UserEntity } from 'users/domain/user.entity'

@Injectable()
export class UsersDtoEntityMapper {
	toEntity(dto: CreateUserInputDto | UpdateUserInputDto): UserEntity {
		if (dto instanceof CreateUserInputDto) {
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
