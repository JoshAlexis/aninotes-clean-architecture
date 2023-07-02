import request from 'supertest'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { PixivModule } from 'pixiv/pixiv.module'
import { TagsModule } from 'tags/tags.module'

describe('Pixiv Endpoints (e2e) - Errors Responses', () => {
	let app: INestApplication
	let prismaService: DeepMockProxy<PrismaService>

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PrismaModule, PixivModule, TagsModule],
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

	describe('GetPixivController', () => {
		it('GET /api/v1/pixiv/:id', async () => {
			prismaService.pixiv.findUnique.mockResolvedValue(null)

			await request(app.getHttpServer()).get(`/pixiv/1`).expect(404)

			expect(prismaService.pixiv.findUnique).toHaveBeenCalled()
		})

		it('GET /api/v1/pixiv/id-pixiv/:idPixiv', async () => {
			prismaService.pixiv.findUnique.mockResolvedValue(null)

			await request(app.getHttpServer()).get(`/pixiv/id-pixiv/1`).expect(404)

			expect(prismaService.pixiv.findUnique).toHaveBeenCalled()
		})
	})
})
