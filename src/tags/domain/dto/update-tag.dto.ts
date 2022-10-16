import { PartialType } from '@nestjs/swagger'
import { CreateTagDto } from './create-tag.dto'

// export type UpdateTagDto = typeof CreateTagDto
export class UpdateTagDto extends PartialType(CreateTagDto) {}
