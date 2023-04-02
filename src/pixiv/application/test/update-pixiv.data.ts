import { UpdatePixivDto } from 'pixiv/domain/dto/update-pixiv.dto'
import { generateRandomIdPixiv } from 'pixiv/application/test/generate-random-id.utils'
import { createPixivData } from 'pixiv/application/test/create-pixiv.data'

export const updatePixivData: UpdatePixivDto = {
	pixivName: 'In Japanese',
	quality: 2,
	favorite: 2,
	idPixiv: generateRandomIdPixiv(),
	hasR18Content: true,
	example: createPixivData.example,
	link: createPixivData.link
}
