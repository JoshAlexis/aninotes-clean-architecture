import { INestApplication } from '@nestjs/common'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { TagsModule } from 'tags/tags.module'
import request from 'supertest'

describe('Tags Endpoints (e2e) - Errors Responses', () => {
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

	describe('GetTagsController', () => {
		it('GET /api/v1/tags/:id', async () => {
			prismaService.tag.findUnique.mockResolvedValue(null)

			await request(app.getHttpServer()).get('/tags/1').expect(404)

			expect(prismaService.tag.findUnique).toHaveBeenCalled()
		})
	})

	describe('PutTagsController', () => {
		it('PUT /api/v1/tags/:id', async () => {
			prismaService.tag.findUnique.mockResolvedValue(null)

			await request(app.getHttpServer()).put('/tags/1').expect(404)

			expect(prismaService.tag.findUnique).toHaveBeenCalled()
		})
	})
})
