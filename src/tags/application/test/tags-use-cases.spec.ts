import { Test, TestingModule } from '@nestjs/testing'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { v4 as uuid } from 'uuid'
import { Tag } from '@prisma/client'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { TagsTokens } from 'tags/di/tags.tokens'
import { CreateTagInputDto } from 'tags/application/dto/create-tag-input.dto'
import { UpdateTagInputDto } from 'tags/application/dto/update-tag-input.dto'
import { TagsEntityMapper } from 'tags/infrastructure/tags-entity.mapper'
import { TagsPrismaRepository } from 'tags/infrastructure/tags-prisma.respository'
import { CreateTag } from '../create-tag.use-case'
import { GetAllTags } from '../get-all-tags.use-case'
import { GetTag } from '../get-tag.use-case'
import { UpdateTag } from '../update-tag.use-case'
import { NotFoundException } from '@nestjs/common'
import { TagNotFoundError } from "tags/domain/errors/tag-not-found.error";

export const createTagData: CreateTagInputDto = {
	name: 'test',
	rated18: false
}

export const createTagMockResponse: Tag = {
	id: uuid(),
	rated18: createTagData.rated18,
	name: createTagData.name,
	createdAt: new Date(),
	updatedAt: new Date()
}

export const updateTagData: UpdateTagInputDto = {
	name: 'Update Tag',
	rated18: true
}

export const updateTagMockResponse: Tag = {
	id: uuid(),
	name: updateTagData.name as string,
	rated18: updateTagData.rated18 as boolean,
	createdAt: new Date(),
	updatedAt: new Date()
}

export const fetchTagByIdMockResponse: Tag = {
	id: uuid(),
	rated18: createTagData.rated18,
	name: createTagData.name,
	createdAt: new Date(),
	updatedAt: new Date()
}

export const fetchTagListMockResponse = [
	{
		id: uuid(),
		rated18: createTagData.rated18,
		name: createTagData.name,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: uuid(),
		rated18: createTagData.rated18,
		name: createTagData.name,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: uuid(),
		rated18: createTagData.rated18,
		name: createTagData.name,
		createdAt: new Date(),
		updatedAt: new Date()
	}
]

describe('Tag Use Cases', () => {
	let createTagUseCase: CreateTag
	let updateTagUseCase: UpdateTag
	let getAllTagsUseCase: GetAllTags
	let getTagUseCase: GetTag
	let prismaService: DeepMockProxy<PrismaService>

	beforeEach(async () => {
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
				TagsEntityMapper,
				PrismaService
			]
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaService>())
			.compile()

		createTagUseCase = app.get<CreateTag>(CreateTag)
		updateTagUseCase = app.get<UpdateTag>(UpdateTag)
		getAllTagsUseCase = app.get<GetAllTags>(GetAllTags)
		getTagUseCase = app.get<GetTag>(GetTag)
		prismaService = app.get(PrismaService)
	})

	it('Should create a tag', async () => {
		prismaService.tag.create.mockResolvedValue(createTagMockResponse)

		const response = await createTagUseCase.run(createTagData)

		expect(response).toBeDefined()
		expect(response).toHaveProperty('id')
		expect(response).toHaveProperty('name')
		expect(response).toHaveProperty('rated18')
		expect(response).toHaveProperty('createdAt')
		expect(response).toHaveProperty('updatedAt')

		expect(response.name).toEqual(createTagData.name)
		expect(response.rated18).toEqual(createTagData.rated18)
	})

	it('Should update a tag', async () => {
		prismaService.tag.findUnique.mockResolvedValue(createTagMockResponse)
		prismaService.tag.update.mockResolvedValue(updateTagMockResponse)

		const response = await updateTagUseCase.run(updateTagMockResponse.id, updateTagData)

		expect(response).toHaveProperty('id')
		expect(response).toHaveProperty('name')
		expect(response).toHaveProperty('rated18')
		expect(response).toHaveProperty('createdAt')
		expect(response).toHaveProperty('updatedAt')

		expect(response.name).toEqual(updateTagData.name)
		expect(response.rated18).toEqual(updateTagData.rated18)
	})

	describe('GetTags', () => {
		it('Should fetch one tag', async () => {
			prismaService.tag.findUnique.mockResolvedValue(fetchTagByIdMockResponse)

			const response = await getTagUseCase.run(fetchTagByIdMockResponse.id)

			expect(response).toHaveProperty('id')
			expect(response).toHaveProperty('name')
			expect(response).toHaveProperty('rated18')
			expect(response).toHaveProperty('createdAt')
			expect(response).toHaveProperty('updatedAt')
		})

		it('Should fail when the tag is not found', async () => {
			prismaService.tag.findUnique.mockResolvedValue(null)

			await expect(getTagUseCase.run(fetchTagByIdMockResponse.id)).rejects.toBeInstanceOf(TagNotFoundError)
		})
	})

	it('Should fetch all tags', async () => {
		prismaService.tag.findMany.mockResolvedValue(fetchTagListMockResponse)

		const response = await getAllTagsUseCase.run()

		expect(response).toHaveProperty('length')
		expect(response.length).toBeGreaterThanOrEqual(3)
	})
})
