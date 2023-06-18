import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserInputDto {
	@IsString()
	@IsOptional()
	userName: string

	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsNotEmpty()
	@IsString()
	password: string
}
