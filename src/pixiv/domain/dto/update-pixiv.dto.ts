import { OmitType } from '@nestjs/swagger'
import { CreatePixivDto } from 'pixiv/domain/dto/create-pixiv.dto'

export class UpdatePixivDto extends OmitType(CreatePixivDto, ['tags'] as const) {}
