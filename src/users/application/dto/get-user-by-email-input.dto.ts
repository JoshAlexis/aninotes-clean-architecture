import { IsEmail, IsNotEmpty } from 'class-validator'

export class GetUserByEmailInputDto {
	@IsNotEmpty()
	@IsEmail()
	email: string
}
