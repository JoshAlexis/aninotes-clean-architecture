import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { TagsModule } from 'tags/tags.module'
import { CreateTagDto } from 'tags/domain/dto/create-tag.dto'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { UpdateTagDto } from 'tags/domain/dto/update-tag.dto'

describe('Tags Endpoints (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [TagsModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [TagsModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		const prisma = app.get<PrismaService>(PrismaService)
		await prisma.pixivTags.deleteMany()
		await prisma.tag.deleteMany()
	})

	describe('PostTagController', () => {
		it('POST /api/v1/tags', async () => {
			const data: CreateTagDto = {
				name: 'test e2e',
				rated18: true
			}

			const result = await request(app.getHttpServer()).post('/tags').send(data).expect(201)

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
			const data: CreateTagDto = {
				name: 'test get e2e',
				rated18: true
			}

			await request(app.getHttpServer()).post('/tags').send(data).expect(201)

			const result = await request(app.getHttpServer()).get('/tags').expect(200)

			expect(result.body).toHaveProperty('length')
			expect(result.body.length).toBeGreaterThan(0)
		})

		it('GET /api/v1/tags/:id', async () => {
			const { body } = await request(app.getHttpServer()).get('/tags').expect(200)

			const result = await request(app.getHttpServer()).get(`/tags/${body[0].id}`).expect(200)

			expect(result.body).toHaveProperty('id')
			expect(result.body).toHaveProperty('name')
			expect(result.body).toHaveProperty('rated18')
			expect(result.body).toHaveProperty('createdAt')
			expect(result.body).toHaveProperty('updatedAt')
		})
	})

	describe('PutTagsController', () => {
		it('PUT /api/v1/tags/:id', async () => {
			const updatedTag: UpdateTagDto = {
				name: 'test e2e',
				rated18: true
			}

			const { body } = await request(app.getHttpServer()).get('/tags').expect(200)

			const result = await request(app.getHttpServer()).put(`/tags/${body[0].id}`).expect(200)

			expect(result.body).toBeDefined()
			expect(result.body).toHaveProperty('id')
			expect(result.body).toHaveProperty('name')
			expect(result.body.name).toBe(updatedTag.name)

			expect(result.body).toHaveProperty('rated18')
			expect(result.body.rated18).toBe(updatedTag.rated18)

			expect(result.body).toHaveProperty('createdAt')
			expect(result.body).toHaveProperty('updatedAt')
		})
	})
})
