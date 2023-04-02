import { Pixiv } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { updatePixivData } from 'pixiv/application/test/update-pixiv.data'

export const updatePixivMockResponse: Pixiv = {
	id: uuid(),
	...updatePixivData,
	createdAt: new Date(),
	updateAt: new Date()
}
