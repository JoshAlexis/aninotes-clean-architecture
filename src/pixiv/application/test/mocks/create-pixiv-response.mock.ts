import { Pixiv } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { createPixivData } from 'pixiv/application/test/create-pixiv.data'

export const createPixivMockResponse: Pixiv = {
	id: uuid(),
	...createPixivData,
	createdAt: new Date(),
	updateAt: new Date()
}
