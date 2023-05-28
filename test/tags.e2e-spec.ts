import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { TagsModule } from 'tags/tags.module'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import {
	createTagData,
	createTagMockResponse,
	fetchTagByIdMockResponse,
	fetchTagListMockResponse,
	updateTagData,
	updateTagMockResponse
} from 'tags/application/test/tags-use-cases.spec'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'

describe('Tags Endpoints (e2e)', () => {
	let app: INestApplication
	let prismaService: DeepMockProxy<PrismaService>

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PrismaModule, TagsModule],
			providers: [PrismaService]
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaService>())
			.compile()

		app = moduleFixture.createNestApplication()
		prismaService = app.get(PrismaService)
		await app.init()
	})

	describe('PostTagController', () => {
		it('POST /api/v1/tags', async () => {
			prismaService.tag.create.mockResolvedValue(createTagMockResponse)
			const result = await request(app.getHttpServer()).post('/tags').send(createTagData).expect(201)

			expect(result.body).toBeDefined()
			expect(result.body).toHaveProperty('id')
			expect(result.body).toHaveProperty('name')
			expect(result.body).toHaveProperty('rated18')
			expect(result.body).toHaveProperty('createdAt')
			expect(result.body).toHaveProperty('updatedAt')
		})
	})

	describe('GetTagsController', () => {
		it('GET /api/v1/tags', async () => {
			prismaService.tag.findMany.mockResolvedValue(fetchTagListMockResponse)
			const result = await request(app.getHttpServer()).get('/tags').expect(200)

			expect(result.body).toHaveProperty('length')
			expect(result.body.length).toBeGreaterThan(0)
		})

		it('GET /api/v1/tags/:id', async () => {
			prismaService.tag.findUnique.mockResolvedValue(fetchTagByIdMockResponse)
			const result = await request(app.getHttpServer()).get(`/tags/${fetchTagByIdMockResponse.id}`).expect(200)

			expect(result.body).toHaveProperty('id')
			expect(result.body).toHaveProperty('name')
			expect(result.body).toHaveProperty('rated18')
			expect(result.body).toHaveProperty('createdAt')
			expect(result.body).toHaveProperty('updatedAt')
		})
	})

	describe('PutTagsController', () => {
		it('PUT /api/v1/tags/:id', async () => {
			prismaService.tag.update.mockResolvedValue(updateTagMockResponse)
			const result = await request(app.getHttpServer()).put(`/tags/${updateTagMockResponse.id}`).expect(200)

			expect(result.body).toBeDefined()
			expect(result.body).toHaveProperty('id')
			expect(result.body).toHaveProperty('name')
			expect(result.body.name).toBe(updateTagData.name)

			expect(result.body).toHaveProperty('rated18')
			expect(result.body.rated18).toBe(updateTagData.rated18)

			expect(result.body).toHaveProperty('createdAt')
			expect(result.body).toHaveProperty('updatedAt')
		})
	})
})
