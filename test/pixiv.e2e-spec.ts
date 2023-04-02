import request from 'supertest'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { v4 as uuid } from 'uuid'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PixivModule } from 'pixiv/pixiv.module'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { TagsModule } from 'tags/tags.module'
import { createPixivMockResponse } from 'pixiv/application/test/mocks/create-pixiv-response.mock'
import { updatePixivMockResponse } from 'pixiv/application/test/mocks/update-pixiv-response.mock'
import { fetchItemPixivMockResponse } from 'pixiv/application/test/mocks/fetch-item-pixiv-response.mock'
import { fetchByIdPixivMockResponse } from 'pixiv/application/test/mocks/fetch-by-id-pixiv-response.mock'
import { fetchPixivListMockResponse } from 'pixiv/application/test/mocks/fetch-pixiv-list-response.mock'
import { createPixivData } from 'pixiv/application/test/create-pixiv.data'
import { updatePixivData } from 'pixiv/application/test/update-pixiv.data'
import { fetchPixivWithTagsDataMockResponse } from 'pixiv/application/test/mocks'
import { Pixiv, Prisma } from '@prisma/client'

describe('Pixiv Endpoints (e2e)', () => {
	let app: INestApplication
	let prismaService: DeepMockProxy<PrismaService>

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PixivModule, TagsModule],
			providers: [PrismaService]
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaService>())
			.compile()

		app = moduleFixture.createNestApplication()
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				forbidUnknownValues: true,
				validationError: {
					value: false
				}
			})
		)
		prismaService = app.get(PrismaService)
		await app.init()
	})

	describe('PostPixivController', () => {
		it('POST /api/v1/pixiv', async () => {
			const tag = uuid()
			createPixivData.tags.push({
				id: tag
			})
			prismaService.pixiv.create.mockResolvedValue(createPixivMockResponse)
			prismaService.pixivTags.create.mockResolvedValue({
				id: uuid(),
				pixivId: createPixivMockResponse.id,
				tagId: uuid()
			})
			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(createPixivData)

			expect(pixivResult.status).toBe(201)
			expect(pixivResult.body).toBeDefined()
			expect(pixivResult.body).toHaveProperty('length')
			expect(pixivResult.body[0]).toHaveProperty('id')
			expect(pixivResult.body[0]).toHaveProperty('pixivName')
			expect(pixivResult.body[0]).toHaveProperty('idPixiv')
			expect(pixivResult.body[0]).toHaveProperty('link')
			expect(pixivResult.body[0]).toHaveProperty('quality')
			expect(pixivResult.body[0]).toHaveProperty('favorite')
			expect(pixivResult.body[1].length).toBeGreaterThanOrEqual(1)

			// itemPixiv = pixivResult.body
			// tag = result.body
		})
	})
	// Consider define query params as optionals
	describe('GetPixivController', () => {
		it('GET /api/v1/pixiv', async () => {
			prismaService.pixiv.findFirst.mockResolvedValue(
				fetchPixivWithTagsDataMockResponse as unknown as Prisma.Prisma__PixivClient<Pixiv>
			)

			prismaService.pixiv.findMany.mockResolvedValue(fetchPixivListMockResponse)
			const result = await request(app.getHttpServer())
				.get('/pixiv')
				.query({
					size: 10,
					page: 1
				})
				.expect(200)

			prismaService.pixiv.findMany.mockResolvedValue(fetchPixivListMockResponse)

			expect(result.body).toBeDefined()
			expect(result.body.length).toBeGreaterThanOrEqual(1)
			expect(result.body[0]).toHaveProperty('tags')
			expect(result.body[0].tags).toHaveLength(1)
		})

		it('GET /api/v1/pixiv/:id', async () => {
			prismaService.pixiv.findFirst.mockResolvedValue(
				fetchPixivWithTagsDataMockResponse as unknown as Prisma.Prisma__PixivClient<Pixiv>
			)
			prismaService.pixiv.findUnique.mockResolvedValue(fetchItemPixivMockResponse)
			const result = await request(app.getHttpServer()).get(`/pixiv/${fetchItemPixivMockResponse.id}`)

			prismaService.pixiv.findUnique.mockResolvedValue(fetchItemPixivMockResponse)

			expect(result.body).toBeDefined()
			expect(result.body.idPixiv).toBe(fetchItemPixivMockResponse.idPixiv)
			expect(result.body.pixivName).toBe(fetchItemPixivMockResponse.pixivName)
			expect(result.body.link).toBe(fetchItemPixivMockResponse.link)
			expect(result.body.quality).toBe(fetchItemPixivMockResponse.quality)
			expect(result.body.favorite).toBe(fetchItemPixivMockResponse.favorite)
			expect(result.body).toHaveProperty('tags')
			expect(result.body.tags).toHaveLength(1)
		})

		it('GET /api/v1/pixiv/id-pixiv/:idPixiv', async () => {
			prismaService.pixiv.findFirst.mockResolvedValue(
				fetchPixivWithTagsDataMockResponse as unknown as Prisma.Prisma__PixivClient<Pixiv>
			)
			prismaService.pixiv.findUnique.mockResolvedValue(fetchByIdPixivMockResponse)
			const result = await request(app.getHttpServer()).get(`/pixiv/id-pixiv/${fetchByIdPixivMockResponse.idPixiv}`)

			// prismaService.pixiv.findFirst.mockResolvedValue(fetchByIdPixivMockResponse)

			expect(result.body).toBeDefined()
			expect(result.body.idPixiv).toBe(fetchByIdPixivMockResponse.idPixiv)
			expect(result.body.link).toBe(fetchByIdPixivMockResponse.link)
			expect(result.body.quality).toBe(fetchByIdPixivMockResponse.quality)
			expect(result.body.favorite).toBe(fetchByIdPixivMockResponse.favorite)
			expect(result.body).toHaveProperty('tags')
			expect(result.body.tags).toHaveLength(1)
		})
	})

	describe('PutPixivController', () => {
		it('PUT /api/v1/pixiv', async () => {
			prismaService.pixiv.update.mockResolvedValue(updatePixivMockResponse)
			const result = await request(app.getHttpServer())
				.put(`/pixiv/${updatePixivMockResponse.id}`)
				.send(updatePixivData)

			expect(result.body).toBeDefined()
			expect(result.body.favorite).toBe(updatePixivData.favorite)
			expect(result.body.quality).toBe(updatePixivData.quality)
			expect(result.body.pixivName).toBe(updatePixivData.pixivName)
		})
	})
})
