import { PixivTags } from '@prisma/client'
import { v4 as uuid } from 'uuid'

export const assignTagToPixivResponseMock: PixivTags = {
	id: uuid(),
	pixivId: uuid(),
	tagId: uuid()
}
