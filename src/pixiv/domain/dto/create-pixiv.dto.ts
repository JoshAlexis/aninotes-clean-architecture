import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	Matches,
	Min,
	ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'

class TagItem {
	@IsString()
	@IsNotEmpty()
	@IsUUID()
	id: string
}

export class CreatePixivDto {
	@IsString()
	@IsOptional()
	pixivName: string

	@IsInt()
	@Min(1)
	idPixiv: number

	@IsString()
	@IsNotEmpty()
	@Matches(/^https:\/\/(w{3}\.)pixiv\.net\/en\/users\/([0-9])([0-9]+)/)
	link: string

	@IsString()
	@IsNotEmpty()
	@Matches(/^https:\/\/(i\.)pximg\.net\/img-original\/img\/[0-9]+(\/[0-9]{2})+\/[0-9]+_p[0-9]+\.(png|jpg|jpeg)/)
	example: string

	@IsBoolean()
	@IsNotEmpty()
	hasR18Content: boolean

	@IsInt()
	@IsNotEmpty()
	@Min(1)
	favorite: number

	@IsInt()
	@IsNotEmpty()
	@Min(1)
	quality: number

	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => TagItem)
	tags: Array<TagItem>
}
