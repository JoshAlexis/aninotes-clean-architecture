import { PartialType } from '@nestjs/swagger'
import { CreateUserInputDto } from 'users/application/dto/create-user-input.dto'

export class UpdateUserInputDto extends PartialType(CreateUserInputDto) {}
