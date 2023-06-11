import { PartialType } from '@nestjs/swagger'
import { CreateUserDto } from 'users/application/dto/create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
