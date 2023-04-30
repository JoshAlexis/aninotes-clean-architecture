import { Test, TestingModule } from '@nestjs/testing'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { v4 as uuid } from 'uuid'
import { Pixiv, Prisma } from '@prisma/client'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { PixivPrismaRepository } from 'pixiv/infrastructure/pixiv-prisma.repository'
import { PixivEntityMapper } from 'pixiv/infrastructure/pixiv-entity.mapper'
import {
	AssignTagToPixiv,
	CreatePixiv,
	GetPixivById,
	GetPixivByIdPixiv,
	GetPixivList,
	RemoveTagFromPixiv,
	UpdatePixiv
} from 'pixiv/application'
import {
	assignTagToPixivResponseMock,
	createPixivMockResponse,
	fetchByIdPixivMockResponse,
	fetchItemPixivMockResponse,
	fetchPixivListMockResponse,
	fetchPixivWithTagsDataMockResponse,
	updatePixivMockResponse
} from 'pixiv/application/test/mocks'
import { createPixivData } from 'pixiv/application/test/create-pixiv.data'
import { updatePixivData } from 'pixiv/application/test/update-pixiv.data'
import { NotFoundException } from '@nestjs/common'

describe('Pixiv Use Cases', () => {
	let createPixiv: CreatePixiv
	let updatePixiv: UpdatePixiv
	let getPixivList: GetPixivList
	let getPixivById: GetPixivById
	let getPixivByIdPixiv: GetPixivByIdPixiv
	let assignTagToPixiv: AssignTagToPixiv
	let removeTagFromPixiv: RemoveTagFromPixiv
	let prismaService: DeepMockProxy<PrismaService>

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: PixivTokens.PIXIV_REPOSITORY,
					useClass: PixivPrismaRepository
				},
				CreatePixiv,
				UpdatePixiv,
				PixivEntityMapper,
				GetPixivList,
				GetPixivById,
				GetPixivByIdPixiv,
				AssignTagToPixiv,
				RemoveTagFromPixiv,
				PrismaService
			]
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaService>())
			.compile()

		createPixiv = app.get<CreatePixiv>(CreatePixiv)
		updatePixiv = app.get<UpdatePixiv>(UpdatePixiv)
		getPixivList = app.get<GetPixivList>(GetPixivList)
		getPixivById = app.get<GetPixivById>(GetPixivById)
		getPixivByIdPixiv = app.get<GetPixivByIdPixiv>(GetPixivByIdPixiv)
		assignTagToPixiv = app.get<AssignTagToPixiv>(AssignTagToPixiv)
		removeTagFromPixiv = app.get<RemoveTagFromPixiv>(RemoveTagFromPixiv)
		prismaService = app.get(PrismaService)
	})

	it('Should create pixiv item', async () => {
		const tag = uuid()
		createPixivData.tags.push({
			id: tag
		})

		prismaService.pixiv.create.mockResolvedValue(createPixivMockResponse)
		prismaService.pixivTags.create.mockResolvedValue({
			id: uuid(),
			pixivId: createPixivMockResponse.id,
			tagId: tag
		})

		const [pixiv, tagsList] = await createPixiv.run(createPixivData)

		expect(pixiv.id).toBe(createPixivMockResponse.id)
		expect(pixiv.idPixiv).toBe(createPixivData.idPixiv)
		expect(pixiv.pixivName).toBe(createPixivData.pixivName)
		expect(pixiv.link).toBe(createPixivData.link)
		expect(pixiv.quality).toBe(createPixivData.quality)
		expect(pixiv.favorite).toBe(createPixivData.favorite)

		expect(tagsList).toHaveLength(createPixivData.tags.length)
	})

	it('Should fetch a list of pixiv items', async () => {
		prismaService.pixiv.findFirst.mockResolvedValue(
			fetchPixivWithTagsDataMockResponse as unknown as Prisma.Prisma__PixivClient<Pixiv>
		)
		prismaService.pixiv.findMany.mockResolvedValue(fetchPixivListMockResponse)

		const list = await getPixivList.run(1, 10)

		expect(list).toHaveProperty('length')
		expect(list.length).toBeGreaterThanOrEqual(3)

		expect(list[0]).toHaveProperty('pixiv')
		expect(list[0]).toHaveProperty('tags')
		expect(list[0].tags).toHaveLength(1)
	})

	it('Should update a pixiv item', async () => {
		prismaService.pixiv.update.mockResolvedValue(updatePixivMockResponse)

		const result = await updatePixiv.run(updatePixivMockResponse.id, updatePixivData)

		expect(result).toBeDefined()
		expect(result.id).toBe(updatePixivMockResponse.id)
		expect(result.idPixiv).toBe(updatePixivData.idPixiv)
		expect(result.pixivName).toBe(updatePixivData.pixivName)
		expect(result.link).toBe(updatePixivData.link)
		expect(result.quality).toBe(updatePixivData.quality)
		expect(result.favorite).toBe(updatePixivData.favorite)
	})

	describe('GetPixivById', () => {
		it('Should fetch an item by id', async () => {
			prismaService.pixiv.findFirst.mockResolvedValue(
				fetchPixivWithTagsDataMockResponse as unknown as Prisma.Prisma__PixivClient<Pixiv>
			)
			prismaService.pixiv.findUnique.mockResolvedValue(fetchItemPixivMockResponse)

			const [result, tagsResult] = await getPixivById.run(fetchItemPixivMockResponse.id)

			expect(result).toBeDefined()
			expect(result.id).toBe(fetchItemPixivMockResponse.id)
			expect(result.idPixiv).toBe(fetchItemPixivMockResponse.idPixiv)
			expect(result.pixivName).toBe(fetchItemPixivMockResponse.pixivName)
			expect(result.link).toBe(fetchItemPixivMockResponse.link)
			expect(result.quality).toBe(fetchItemPixivMockResponse.quality)
			expect(result.favorite).toBe(fetchItemPixivMockResponse.favorite)

			expect(tagsResult).toHaveLength(1)
			expect(tagsResult[0]).toHaveProperty('idPixivTag')
			expect(tagsResult[0]).toHaveProperty('name')
			expect(tagsResult[0].name).toBe(fetchPixivWithTagsDataMockResponse.tags[0].tag?.name)
			expect(tagsResult[0].idPixivTag).toBe(fetchPixivWithTagsDataMockResponse.tags[0].id)
		})

		it('Should fail when an item is not found', async () => {
			prismaService.pixiv.findUnique.mockResolvedValue(null)

			await expect(getPixivById.run(fetchItemPixivMockResponse.id)).rejects.toBeInstanceOf(NotFoundException)
		})
	})

	describe('GetPixivByIdPixiv', () => {
		it('Should fetch an item by idPixiv', async () => {
			prismaService.pixiv.findFirst.mockResolvedValue(
				fetchPixivWithTagsDataMockResponse as unknown as Prisma.Prisma__PixivClient<Pixiv>
			)

			prismaService.pixiv.findUnique.mockResolvedValue(fetchByIdPixivMockResponse)

			const [result, tagsResult] = await getPixivByIdPixiv.run(fetchByIdPixivMockResponse.idPixiv)

			expect(result).toBeDefined()
			expect(result.id).toBe(fetchByIdPixivMockResponse.id)
			expect(result.idPixiv).toBe(fetchByIdPixivMockResponse.idPixiv)
			expect(result.pixivName).toBe(fetchByIdPixivMockResponse.pixivName)
			expect(result.link).toBe(fetchByIdPixivMockResponse.link)
			expect(result.quality).toBe(fetchByIdPixivMockResponse.quality)
			expect(result.favorite).toBe(fetchByIdPixivMockResponse.favorite)

			expect(tagsResult).toHaveLength(1)
			expect(tagsResult[0]).toHaveProperty('idPixivTag')
			expect(tagsResult[0]).toHaveProperty('name')
			expect(tagsResult[0].name).toBe(fetchPixivWithTagsDataMockResponse.tags[0].tag?.name)
			expect(tagsResult[0].idPixivTag).toBe(fetchPixivWithTagsDataMockResponse.tags[0].id)
		})

		it('Should fail when an item is not found', async () => {
			prismaService.pixiv.findUnique.mockResolvedValue(null)

			await expect(getPixivByIdPixiv.run(fetchByIdPixivMockResponse.idPixiv)).rejects.toBeInstanceOf(NotFoundException)
		})
	})

	it('Should assign a tag to Pixiv', async () => {
		prismaService.pixivTags.create.mockResolvedValue(assignTagToPixivResponseMock)

		const result = await assignTagToPixiv.run(
			assignTagToPixivResponseMock.pixivId as string,
			assignTagToPixivResponseMock.tagId as string
		)

		expect(result).toBeDefined()
		expect(result.id).toBe(assignTagToPixivResponseMock.id)
		expect(result.idPixiv).toBe(assignTagToPixivResponseMock.pixivId)
		expect(result.idTag).toBe(assignTagToPixivResponseMock.tagId)
	})

	it('Should remove a tag from Pixiv', async () => {
		prismaService.pixivTags.delete.mockResolvedValue({
			id: uuid(),
			pixivId: uuid(),
			tagId: uuid()
		})

		const result = await removeTagFromPixiv.run(uuid())

		expect(result).toBe(true)
	})
})
