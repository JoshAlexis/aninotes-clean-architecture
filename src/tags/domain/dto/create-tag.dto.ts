import { IsNotEmpty, IsString, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTagDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The name of the tag',
		type: String
	})
	name: string

	@IsNotEmpty()
	@IsBoolean()
	@ApiProperty({
		description: 'If the tag is related to +18 content',
		type: Boolean
	})
	rated18: boolean
}
