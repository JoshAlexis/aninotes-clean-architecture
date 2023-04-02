import { Pixiv } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { generateRandomIdPixiv } from 'pixiv/application/test/generate-random-id.utils'
import { createPixivData } from 'pixiv/application/test/create-pixiv.data'

export const fetchItemPixivMockResponse: Pixiv = {
	id: uuid(),
	pixivName: 'In Japanese',
	quality: 2,
	favorite: 3,
	link: createPixivData.link,
	idPixiv: generateRandomIdPixiv(),
	hasR18Content: true,
	example: 'https://www.pixiv.net/en/artworks/93435536',
	createdAt: new Date(),
	updateAt: new Date()
}
