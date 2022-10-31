import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { TagsModule } from 'tags/tags.module'

describe('Tags Endpoints (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [TagsModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	describe('GetTagsController', () => {
		it('GET /api/v1/tags/', () => {
			return request(app.getHttpServer()).get('/tags').expect(200)
		})
	})
})
