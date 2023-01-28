import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PixivModule } from 'pixiv/pixiv.module'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { CreatePixivDto } from 'pixiv/domain/dto/create-pixiv.dto'
import { TagsModule } from 'tags/tags.module'
import { CreateTagDto } from 'tags/domain/dto/create-tag.dto'
import { Pixiv, Tag } from '@prisma/client'
import { UpdatePixivDto } from 'pixiv/domain/dto/update-pixiv.dto'

describe('Pixiv Endpoints (e2e)', () => {
	let app: INestApplication
	let itemPixiv: Pixiv
	let tag: Tag

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PixivModule, TagsModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PixivModule, TagsModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		const prisma = app.get<PrismaService>(PrismaService)
		await prisma.pixivTags.deleteMany()
		await prisma.tag.deleteMany()
		await prisma.pixiv.deleteMany()
	})

	describe('PostPixivController', () => {
		it('POST /api/v1/pixiv', async () => {
			const dataTag: CreateTagDto = {
				name: 'test e2e',
				rated18: true
			}

			const result = await request(app.getHttpServer()).post('/tags').send(dataTag).expect(201)

			const pixivData: CreatePixivDto = {
				idPixiv: 213125,
				pixivName: 'test',
				quality: 3,
				favorite: 3,
				link: 'https://www.pixiv.net/en/users/33076135',
				tags: [
					{
						id: result.body.id
					}
				]
			}

			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(pixivData).expect(201)

			expect(pixivResult.body).toBeDefined()
			expect(pixivResult.body).toHaveProperty('length')
			expect(pixivResult.body[0]).toHaveProperty('id')
			expect(pixivResult.body[0]).toHaveProperty('pixivName')
			expect(pixivResult.body[0]).toHaveProperty('idPixiv')
			expect(pixivResult.body[0]).toHaveProperty('link')
			expect(pixivResult.body[0]).toHaveProperty('quality')
			expect(pixivResult.body[0]).toHaveProperty('favorite')
			expect(pixivResult.body[1].length).toBeGreaterThanOrEqual(1)

			itemPixiv = pixivResult.body
			tag = result.body
		})
	})
	// Consider define query params as optionals
	describe('GetPixivController', () => {
		it('GET /api/v1/pixiv', async () => {
			const result = await request(app.getHttpServer())
				.get('/pixiv')
				.query({
					size: 10,
					page: 1
				})
				.expect(200)

			expect(result.body).toBeDefined()
			expect(result.body.length).toBeGreaterThanOrEqual(1)
		})

		it('GET /api/v1/pixiv/:id', async () => {
			const result = await request(app.getHttpServer()).get(`/pixiv/${itemPixiv.id}`)

			expect(result.body).toBeDefined()
			expect(result.body.idPixiv).toBe(itemPixiv.idPixiv)
			expect(result.body.pixivName).toBe(itemPixiv.pixivName)
			expect(result.body.link).toBe(itemPixiv.link)
			expect(result.body.quality).toBe(itemPixiv.quality)
			expect(result.body.favorite).toBe(itemPixiv.favorite)
		})

		it('GET /api/v1/pixiv/id-pixiv/:idPixiv', async () => {
			const resultGet = await request(app.getHttpServer())
				.get('/pixiv')
				.query({
					size: 10,
					page: 1
				})
				.expect(200)

			const result = await request(app.getHttpServer()).get(`/pixiv/id-pixiv/${itemPixiv.idPixiv}`)

			expect(result.body).toBeDefined()
			expect(result.body.idPixiv).toBe(itemPixiv.idPixiv)
			expect(result.body.link).toBe(itemPixiv.link)
			expect(result.body.quality).toBe(itemPixiv.quality)
			expect(result.body.favorite).toBe(itemPixiv.favorite)
		})
	})

	describe('PutPixivController', () => {
		it('PUT /api/v1/pixiv', async () => {
			const dataTag: CreateTagDto = {
				name: 'test e2e',
				rated18: true
			}

			const createTagResult = await request(app.getHttpServer()).post('/tags').send(dataTag).expect(201)

			const pixivData: CreatePixivDto = {
				idPixiv: 23123,
				pixivName: 'test',
				quality: 3,
				favorite: 3,
				link: 'https://www.pixiv.net/en/users/33076135',
				tags: [
					{
						id: createTagResult.body.id
					}
				]
			}

			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(pixivData).expect(201)

			const [pixivItem] = pixivResult.body

			const newData: UpdatePixivDto = {
				link: pixivItem.link,
				idPixiv: pixivItem.idPixiv,
				favorite: 2,
				quality: 2,
				pixivName: 'In Japanese'
			}

			const result = await request(app.getHttpServer()).put(`/pixiv/${pixivItem.id}`).send(newData)

			expect(result.body).toBeDefined()
			expect(result.body.favorite).toBe(newData.favorite)
			expect(result.body.quality).toBe(newData.quality)
			expect(result.body.pixivName).toBe(newData.pixivName)
		})
	})
})
