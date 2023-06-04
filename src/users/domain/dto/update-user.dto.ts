import { PartialType } from '@nestjs/swagger'
import { CreateUserDto } from 'users/domain/dto/create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
