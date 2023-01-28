import { CreatePixivDto } from 'pixiv/domain/dto/create-pixiv.dto'

export type UpdatePixivDto = Omit<CreatePixivDto, 'tags'>
