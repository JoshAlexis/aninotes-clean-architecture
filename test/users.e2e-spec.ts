import request from 'supertest'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { createUserResult } from 'users/application/test/create-user-result.utils'
import { UsersModule } from 'users/users.module'

describe('User Endpoints (e2e)', () => {
	let app: INestApplication
	let prismaService: DeepMockProxy<PrismaService>

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UsersModule],
			providers: [PrismaService]
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaService>)
			.compile()

		app = moduleFixture.createNestApplication()

		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidUnknownValues: true,
				forbidNonWhitelisted: true,
				validationError: {
					value: false
				}
			})
		)

		prismaService = app.get(PrismaService)
		await app.init()
	})

	describe('PostPixivController', () => {
		it('GET /api/v1/users', async () => {
			prismaService.user.findMany.mockResolvedValue([createUserResult])

			const result = await request(app.getHttpServer()).get('/users').expect(200)

			expect(result.body).toBeDefined()
			expect(result.body).toHaveLength(1)
			expect(result.body[0].id).toBe(createUserResult.id)
			expect(result.body[0].email).toBe(createUserResult.email)
			expect(result.body[0].userName).toBe(createUserResult.userName)
			expect(result.body[0].updatedAt).toBe(createUserResult.updatedAt)
			expect(result.body[0].createdAt).toBe(createUserResult.createdAt)
		})
	})
})
