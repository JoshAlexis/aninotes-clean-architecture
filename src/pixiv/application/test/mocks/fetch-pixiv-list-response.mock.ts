import { v4 as uuid } from 'uuid'
import { createPixivData } from 'pixiv/application/test/create-pixiv.data'

export const fetchPixivListMockResponse = [
	{
		id: uuid(),
		...createPixivData,
		createdAt: new Date(),
		updateAt: new Date()
	},
	{
		id: uuid(),
		...createPixivData,
		createdAt: new Date(),
		updateAt: new Date()
	},
	{
		id: uuid(),
		...createPixivData,
		createdAt: new Date(),
		updateAt: new Date()
	}
]
