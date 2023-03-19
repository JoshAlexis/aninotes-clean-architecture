import { Test, TestingModule } from '@nestjs/testing'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { v4 as uuid } from 'uuid'
import { Pixiv, PixivTags } from '@prisma/client'
import { CreatePixiv } from 'pixiv/application/create-pixiv.use-case'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { UpdatePixiv } from 'pixiv/application/update-pixiv.use-case'
import { CreatePixivDto } from 'pixiv/domain/dto/create-pixiv.dto'
import { PixivPrismaRepository } from 'pixiv/infrastructure/pixiv-prisma.repository'
import { PixivEntityMapper } from 'pixiv/infrastructure/pixiv-entity.mapper'
import { GetPixivList } from 'pixiv/application/get-pixiv-list.use-case'
import { UpdatePixivDto } from 'pixiv/domain/dto/update-pixiv.dto'
import { GetPixivByIdPixiv } from 'pixiv/application/get-pixiv-by-id-pixiv.use-case'
import { GetPixivById } from 'pixiv/application/get-pixiv-by-id.use-case'
import { AssignTagToPixiv } from 'pixiv/application/assign-tag-pixiv'
import { RemoveTagFromPixiv } from 'pixiv/application/remove-tag-pixiv'

function generateRandomIdPixiv() {
	return Math.floor(Math.random() * 2000)
}

export const createPixivData: CreatePixivDto = {
	idPixiv: 12312412,
	pixivName: "L'vin",
	link: 'https://www.pixiv.net/en/users/38183633',
	quality: 4,
	favorite: 3,
	hasR18Content: true,
	example: 'https://i.pximg.net/img-original/img/2022/07/09/03/58/07/99541125_p0.png',
	tags: []
}

export const updatePixivData: UpdatePixivDto = {
	pixivName: 'In Japanese',
	quality: 2,
	favorite: 2,
	idPixiv: generateRandomIdPixiv(),
	hasR18Content: true,
	example: createPixivData.example,
	link: createPixivData.link
}

export const createPixivMockResponse: Pixiv = {
	id: uuid(),
	...createPixivData,
	createdAt: new Date(),
	updateAt: new Date()
}

export const updatePixivMockResponse: Pixiv = {
	id: uuid(),
	...updatePixivData,
	createdAt: new Date(),
	updateAt: new Date()
}

export const fetchItemPixivMockResponse: Pixiv = {
	id: uuid(),
	pixivName: 'In Japanese',
	quality: 2,
	favorite: 3,
	link: createPixivData.link,
	idPixiv: generateRandomIdPixiv(),
	hasR18Content: true,
	example: 'https://www.pixiv.net/en/artworks/93435536',
	createdAt: new Date(),
	updateAt: new Date()
}

export const fetchByIdPixivMockResponse: Pixiv = {
	id: uuid(),
	favorite: 1,
	quality: 3,
	pixivName: 'In Japanese',
	link: createPixivData.link,
	idPixiv: generateRandomIdPixiv(),
	hasR18Content: true,
	example: 'https://www.pixiv.net/en/artworks/93435536',
	createdAt: new Date(),
	updateAt: new Date()
}

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

export const assignTagToPixivMockResponse: PixivTags = {
	id: uuid(),
	pixivId: uuid(),
	tagId: uuid()
}

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
		prismaService.pixiv.findMany.mockResolvedValue(fetchPixivListMockResponse)

		const list = await getPixivList.run(1, 10)

		expect(list).toHaveProperty('length')
		expect(list.length).toBeGreaterThanOrEqual(3)
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

	it('Should fetch an item by id', async () => {
		prismaService.pixiv.findUnique.mockResolvedValue(fetchItemPixivMockResponse)

		const result = await getPixivById.run(fetchItemPixivMockResponse.id)

		expect(result).toBeDefined()
		expect(result.id).toBe(fetchItemPixivMockResponse.id)
		expect(result.idPixiv).toBe(fetchItemPixivMockResponse.idPixiv)
		expect(result.pixivName).toBe(fetchItemPixivMockResponse.pixivName)
		expect(result.link).toBe(fetchItemPixivMockResponse.link)
		expect(result.quality).toBe(fetchItemPixivMockResponse.quality)
		expect(result.favorite).toBe(fetchItemPixivMockResponse.favorite)
	})

	it('Should fetch an item by idPixiv', async () => {
		prismaService.pixiv.findFirst.mockResolvedValue(fetchByIdPixivMockResponse)

		const result = await getPixivByIdPixiv.run(fetchByIdPixivMockResponse.idPixiv)

		expect(result).toBeDefined()
		expect(result.id).toBe(fetchByIdPixivMockResponse.id)
		expect(result.idPixiv).toBe(fetchByIdPixivMockResponse.idPixiv)
		expect(result.pixivName).toBe(fetchByIdPixivMockResponse.pixivName)
		expect(result.link).toBe(fetchByIdPixivMockResponse.link)
		expect(result.quality).toBe(fetchByIdPixivMockResponse.quality)
		expect(result.favorite).toBe(fetchByIdPixivMockResponse.favorite)
	})

	it('Should assign a tag to Pixiv', async () => {
		prismaService.pixivTags.create.mockResolvedValue(assignTagToPixivMockResponse)

		const result = await assignTagToPixiv.run(
			assignTagToPixivMockResponse.pixivId as string,
			assignTagToPixivMockResponse.tagId as string
		)

		expect(result).toBeDefined()
		expect(result.id).toBe(assignTagToPixivMockResponse.id)
		expect(result.idPixiv).toBe(assignTagToPixivMockResponse.pixivId)
		expect(result.idTag).toBe(assignTagToPixivMockResponse.tagId)
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
