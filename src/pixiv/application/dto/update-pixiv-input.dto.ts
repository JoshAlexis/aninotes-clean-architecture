import { OmitType } from '@nestjs/swagger'
import { CreatePixivInputDto } from 'pixiv/application/dto/create-pixiv-input.dto'

export class UpdatePixivInputDto extends OmitType(CreatePixivInputDto, ['tags'] as const) {}
