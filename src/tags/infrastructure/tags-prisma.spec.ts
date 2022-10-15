import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { TagsTokens } from 'tags/di/tags.tokens'
import { TagsRepository } from 'tags/domain/tags.repository'
import { TagsPrismaRepository } from './tags-prisma.respository'

describe('Tags Prisma Repository', () => {
	let tagsRepository: TagsRepository
	const prismaClient = new PrismaService()

	beforeEach(async () => {
		await prismaClient.tag.deleteMany()
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: TagsTokens.TAGS_REPOSITORY,
					useClass: TagsPrismaRepository
				}
			],
			imports: [PrismaModule]
		}).compile()

		tagsRepository = app.get<TagsRepository>(TagsTokens.TAGS_REPOSITORY)
	})

	afterAll(async () => {
		await prismaClient.$disconnect()
	})

	it('Should query to database', async () => {
		const data = await tagsRepository.getAllTags()

		expect(data.length).toEqual(0)
	})
})
