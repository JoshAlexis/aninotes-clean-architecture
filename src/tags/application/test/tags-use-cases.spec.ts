import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { TagsTokens } from 'tags/di/tags.tokens'
import { CreateTagDto } from 'tags/domain/dto/create-tag.dto'
import { UpdateTagDto } from 'tags/domain/dto/update-tag.dto'
import { TagsEntityMapper } from 'tags/infrastructure/tags-entity.mapper'
import { TagsPrismaRepository } from 'tags/infrastructure/tags-prisma.respository'
import { CreateTag } from '../create-tag.use-case'
import { GetAllTags } from '../get-all-tags.use-case'
import { GetTag } from '../get-tag.use-case'
import { UpdateTag } from '../update-tag.use-case'

describe('Tag Use Cases', () => {
	let createTagUseCase: CreateTag
	let updateTagUseCase: UpdateTag
	let getAllTagsUseCase: GetAllTags
	let getTagUseCase: GetTag

	const prismaClient = new PrismaService()

	const tag: CreateTagDto = {
		name: 'test',
		rated18: false
	}

	beforeEach(async () => {
		// await prismaClient.pixivTags.deleteMany()
		// await prismaClient.pixiv.deleteMany()
		// await prismaClient.tag.deleteMany()
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: TagsTokens.TAGS_REPOSITORY,
					useClass: TagsPrismaRepository
				},
				CreateTag,
				UpdateTag,
				GetAllTags,
				GetTag,
				TagsEntityMapper
			],
			imports: [PrismaModule]
		}).compile()

		createTagUseCase = app.get<CreateTag>(CreateTag)
		updateTagUseCase = app.get<UpdateTag>(UpdateTag)
		getAllTagsUseCase = app.get<GetAllTags>(GetAllTags)
		getTagUseCase = app.get<GetTag>(GetTag)
	})

	afterAll(async () => {
		await prismaClient.pixivTags.deleteMany()
		await prismaClient.pixiv.deleteMany()
		await prismaClient.tag.deleteMany()
		await prismaClient.$disconnect()
	})

	it('Should create a tag', async () => {
		const data = await createTagUseCase.run(tag)

		expect(data).toBeDefined()
		expect(data).toHaveProperty('id')
		expect(data).toHaveProperty('name')
		expect(data).toHaveProperty('rated18')
		expect(data).toHaveProperty('createdAt')
		expect(data).toHaveProperty('updatedAt')
	})

	it('Should update a tag', async () => {
		const updatedTag: UpdateTagDto = {
			name: 'Updated Tag',
			rated18: true
		}

		const result = await createTagUseCase.run(tag)

		const response = await updateTagUseCase.run(result.id, updatedTag)

		expect(response).toHaveProperty('id')
		expect(response).toHaveProperty('name')
		expect(response).toHaveProperty('rated18')
		expect(response).toHaveProperty('createdAt')
		expect(response).toHaveProperty('updatedAt')

		expect(response.name).toEqual(updatedTag.name)
		expect(response.rated18).toEqual(updatedTag.rated18)
	})

	it('Should fetch one tag', async () => {
		const result = await createTagUseCase.run(tag)

		const response = await getTagUseCase.run(result.id)

		expect(response).toHaveProperty('id')
		expect(response).toHaveProperty('name')
		expect(response).toHaveProperty('rated18')
		expect(response).toHaveProperty('createdAt')
		expect(response).toHaveProperty('updatedAt')
	})

	it('Should fetch all tags', async () => {
		await createTagUseCase.run(tag)
		await createTagUseCase.run(tag)
		await createTagUseCase.run(tag)

		const response = await getAllTagsUseCase.run()

		expect(response).toHaveProperty('length')
		expect(response.length).toBeGreaterThan(3)
	})
})
