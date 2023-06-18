import { IsNotEmpty, IsString, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTagInputDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The name of the tag',
		type: String
	})
	name: string

	@IsBoolean()
	@IsNotEmpty()
	@ApiProperty({
		description: 'If the tag is related to +18 content',
		type: Boolean
	})
	rated18: boolean
}
