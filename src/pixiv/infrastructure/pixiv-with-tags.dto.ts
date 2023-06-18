import { Prisma } from '@prisma/client'

export const PixivWithTagsDefinition = Prisma.validator<Prisma.PixivArgs>()({
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

export type PixivWithTagsDto = Prisma.PixivGetPayload<typeof PixivWithTagsDefinition>
