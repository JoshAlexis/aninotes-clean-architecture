import { Prisma } from '@prisma/client'
import { v4 as uuid } from 'uuid'

export const PixivWithTagsDataMockDefinition = Prisma.validator<Prisma.PixivArgs>()({
	select: {
		tags: {
			select: {
				id: true,
				tag: {
					select: {
						name: true
					}
				}
			}
		}
	}
})

export type PixivWithTagsDataMock = Prisma.PixivGetPayload<typeof PixivWithTagsDataMockDefinition>

export const fetchPixivWithTagsDataMockResponse: PixivWithTagsDataMock = {
	tags: [
		{
			id: uuid(),
			tag: {
				name: 'Test'
			}
		}
	]
}
