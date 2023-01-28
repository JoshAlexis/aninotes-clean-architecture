import { Test, TestingModule } from '@nestjs/testing'
import { CreatePixiv } from 'pixiv/application/create-pixiv.use-case'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { UpdatePixiv } from 'pixiv/application/update-pixiv.use-case'
import { CreatePixivDto } from 'pixiv/domain/dto/create-pixiv.dto'
import { CreateTagDto } from 'tags/domain/dto/create-tag.dto'
import { PixivPrismaRepository } from 'pixiv/infrastructure/pixiv-prisma.repository'
import { PixivEntityMapper } from 'pixiv/infrastructure/pixiv-entity.mapper'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { GetPixivList } from 'pixiv/application/get-pixiv-list.use-case'
import { UpdatePixivDto } from 'pixiv/domain/dto/update-pixiv.dto'
import { GetPixivByIdPixiv } from 'pixiv/application/get-pixiv-by-id-pixiv.use-case'
import { GetPixivById } from 'pixiv/application/get-pixiv-by-id.use-case'
import { AssignTagToPixiv } from 'pixiv/application/assign-tag-pixiv'
import { RemoveTagFromPixiv } from 'pixiv/application/remove-tag-pixiv'

function generateRandomIdPixiv() {
	return Math.floor(Math.random() * 2000)
}

describe('Pixiv Use Case', () => {
	let createPixiv: CreatePixiv
	let updatePixiv: UpdatePixiv
	let getPixivList: GetPixivList
	let getPixivById: GetPixivById
	let getPixivByIdPixiv: GetPixivByIdPixiv
	let assignTagToPixiv: AssignTagToPixiv
	let removeTagFromPixiv: RemoveTagFromPixiv

	let prismaService: PrismaService

	const data: CreatePixivDto = {
		idPixiv: 12312412,
		pixivName: "L'vin",
		link: 'https://www.pixiv.net/en/users/38183633',
		quality: 4,
		favorite: 3,
		tags: []
	}

	const tag: CreateTagDto = {
		name: 'test',
		rated18: false
	}

	beforeAll(() => {
		prismaService = new PrismaService()
	})

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
				RemoveTagFromPixiv
			],
			imports: [PrismaModule]
		}).compile()

		createPixiv = app.get<CreatePixiv>(CreatePixiv)
		updatePixiv = app.get<UpdatePixiv>(UpdatePixiv)
		getPixivList = app.get<GetPixivList>(GetPixivList)
		getPixivById = app.get<GetPixivById>(GetPixivById)
		getPixivByIdPixiv = app.get<GetPixivByIdPixiv>(GetPixivByIdPixiv)
		assignTagToPixiv = app.get<AssignTagToPixiv>(AssignTagToPixiv)
		removeTagFromPixiv = app.get<RemoveTagFromPixiv>(RemoveTagFromPixiv)
	})

	afterEach(async () => {
		await prismaService.pixivTags.deleteMany()
		await prismaService.pixiv.deleteMany()
		await prismaService.tag.deleteMany()
		await prismaService.$disconnect()
	})

	test('Should create pixiv item', async () => {
		const createdTag = await prismaService.tag.create({
			data: {
				...tag
			}
		})

		data.tags.push({
			id: createdTag.id
		})

		const [pixiv, tagsList] = await createPixiv.run(data)

		expect(pixiv.id).toBeGreaterThan(0)
		expect(pixiv.idPixiv).toBe(data.idPixiv)
		expect(pixiv.pixivName).toBe(data.pixivName)
		expect(pixiv.link).toBe(data.link)
		expect(pixiv.quality).toBe(data.quality)
		expect(pixiv.favorite).toBe(data.favorite)

		expect(tagsList).toHaveLength(data.tags.length)
	})

	it('Should fetch a list of pixiv items', async () => {
		const createdTag = await prismaService.tag.create({
			data: {
				...tag
			}
		})

		const pixivData: CreatePixivDto = {
			pixivName: 'In Japanese',
			quality: 2,
			favorite: 3,
			link: data.link,
			idPixiv: generateRandomIdPixiv(),
			tags: [
				{
					id: createdTag.id
				}
			]
		}

		await createPixiv.run(pixivData)

		const list = await getPixivList.run(1, 10)

		expect(list).toHaveProperty('length')
		expect(list.length).toBeGreaterThanOrEqual(1)
	})

	it('Should update a pixiv item', async () => {
		const createdTag = await prismaService.tag.create({
			data: {
				...tag
			}
		})

		const pixivData: CreatePixivDto = {
			pixivName: 'In Japanese',
			quality: 2,
			favorite: 3,
			link: data.link,
			idPixiv: generateRandomIdPixiv(),
			tags: [
				{
					id: createdTag.id
				}
			]
		}

		const [pixiv] = await createPixiv.run(pixivData)

		const newData: UpdatePixivDto = {
			...pixiv,
			favorite: 2,
			idPixiv: generateRandomIdPixiv()
		}

		const result = await updatePixiv.run(pixiv.id, newData)

		expect(result).toBeDefined()
		expect(result.id).toBeGreaterThan(0)
		expect(result.idPixiv).toBe(newData.idPixiv)
		expect(result.pixivName).toBe(newData.pixivName)
		expect(result.link).toBe(newData.link)
		expect(result.quality).toBe(newData.quality)
		expect(result.favorite).toBe(newData.favorite)
	})

	it('Should fetch an item by id', async () => {
		const createdTag = await prismaService.tag.create({
			data: {
				...tag
			}
		})

		const pixivData: CreatePixivDto = {
			pixivName: 'In Japanese',
			quality: 2,
			favorite: 3,
			link: data.link,
			idPixiv: generateRandomIdPixiv(),
			tags: [
				{
					id: createdTag.id
				}
			]
		}

		const [createdPixiv] = await createPixiv.run(pixivData)

		const result = await getPixivById.run(createdPixiv.id)

		expect(result).toBeDefined()
		expect(result.id).toBeGreaterThan(0)
		expect(result.idPixiv).toBe(pixivData.idPixiv)
		expect(result.pixivName).toBe(pixivData.pixivName)
		expect(result.link).toBe(pixivData.link)
		expect(result.quality).toBe(pixivData.quality)
		expect(result.favorite).toBe(pixivData.favorite)
	})

	it('Should fetch an item by idPixiv', async () => {
		const createdTag = await prismaService.tag.create({
			data: {
				...tag
			}
		})

		const pixivData: CreatePixivDto = {
			favorite: 1,
			quality: 3,
			pixivName: 'In Japanese',
			link: data.link,
			idPixiv: generateRandomIdPixiv(),
			tags: [
				{
					id: createdTag.id
				}
			]
		}

		await createPixiv.run(pixivData)

		const result = await getPixivByIdPixiv.run(pixivData.idPixiv)

		expect(result).toBeDefined()
		expect(result.id).toBeGreaterThan(0)
		expect(result.idPixiv).toBe(pixivData.idPixiv)
		expect(result.pixivName).toBe(pixivData.pixivName)
		expect(result.link).toBe(pixivData.link)
		expect(result.quality).toBe(pixivData.quality)
		expect(result.favorite).toBe(pixivData.favorite)
	})

	it('Should assign a tag to Pixiv', async () => {
		const createdTag = await prismaService.tag.create({
			data: {
				...tag
			}
		})

		const pixivData: CreatePixivDto = {
			favorite: 1,
			quality: 3,
			pixivName: 'In Japanese',
			link: data.link,
			idPixiv: generateRandomIdPixiv(),
			tags: [
				{
					id: createdTag.id
				}
			]
		}

		const newTag = await prismaService.tag.create({
			data: {
				...tag
			}
		})

		const [createdPixiv] = await createPixiv.run(pixivData)

		const result = await assignTagToPixiv.run(createdPixiv.id, newTag.id)

		expect(result).toBeDefined()
		expect(result.id).toBeGreaterThan(0)
		expect(result.idPixiv).toBe(createdPixiv.id)
		expect(result.idTag).toBe(newTag.id)
	})

	it('Should remove a tag from Pixiv', async () => {
		const createdTag = await prismaService.tag.create({
			data: {
				...tag
			}
		})

		const pixivData: CreatePixivDto = {
			favorite: 1,
			quality: 3,
			pixivName: 'In Japanese',
			link: data.link,
			idPixiv: generateRandomIdPixiv(),
			tags: [
				{
					id: createdTag.id
				}
			]
		}

		const [, tagList] = await createPixiv.run(pixivData)

		const result = await removeTagFromPixiv.run(tagList[0].id)

		expect(result).toBe(true)
	})
})
