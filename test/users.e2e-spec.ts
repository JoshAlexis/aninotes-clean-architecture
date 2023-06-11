import request from 'supertest'
import dayjs from 'dayjs'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { createUserResult } from 'users/application/test/create-user-result.utils'
import { UsersModule } from 'users/users.module'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { CreateUserDto, UpdateUserDto } from 'users/domain/dto'
import { updateUserResult } from 'users/application/test/update-user-result.utils'

function formatDate(date: Date) {
	return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

describe('User Endpoints (e2e)', () => {
	let app: INestApplication
	let prismaService: DeepMockProxy<PrismaService>

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PrismaModule, UsersModule],
			providers: [PrismaService]
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaService>())
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

	describe('GetUserController', () => {
		it('GET /api/v1/users', async () => {
			prismaService.user.findMany.mockResolvedValue([createUserResult])

			const result = await request(app.getHttpServer()).get('/users').expect(200)

			expect(result.body).toBeDefined()
			expect(result.body).toHaveLength(1)
			expect(result.body[0].id).toBe(createUserResult.id)
			expect(result.body[0].email).toBe(createUserResult.email)
			expect(result.body[0].userName).toBe(createUserResult.userName)
			expect(result.body[0].updatedAt).toBe(formatDate(createUserResult.updatedAt))
			expect(result.body[0].createdAt).toBe(formatDate(createUserResult.createdAt))
		})
	})

	describe('PostUserController', () => {
		it('POST /api/v1/users/email', async () => {
			prismaService.user.findFirst.mockResolvedValue(createUserResult)

			const result = await request(app.getHttpServer())
				.post('/users/email')
				.send({
					email: createUserResult.email
				})
				.expect(200)

			expect(result.body).toBeDefined()
			expect(result.body.id).toBe(createUserResult.id)
			expect(result.body.email).toBe(createUserResult.email)
			expect(result.body.userName).toBe(createUserResult.userName)
			expect(result.body.updatedAt).toBe(formatDate(createUserResult.updatedAt))
			expect(result.body.createdAt).toBe(formatDate(createUserResult.createdAt))
		})

		it('POST /api/v1/users', async () => {
			prismaService.user.create.mockResolvedValue(createUserResult)

			const createUserDto: CreateUserDto = {
				userName: createUserResult.userName as string,
				email: createUserResult.email,
				password: createUserResult.password
			}

			const result = await request(app.getHttpServer()).post('/users').send(createUserDto).expect(201)

			expect(result.body).toBeDefined()
			expect(result.body.id).toBe(createUserResult.id)
			expect(result.body.email).toBe(createUserResult.email)
			expect(result.body.userName).toBe(createUserResult.userName)
			expect(result.body.updatedAt).toBe(formatDate(createUserResult.updatedAt))
			expect(result.body.createdAt).toBe(formatDate(createUserResult.createdAt))
		})
	})

	describe('PutUsersController', () => {
		it('PUT /api/v1/users', async () => {
			prismaService.user.findUnique.mockResolvedValue(createUserResult)

			prismaService.user.update.mockResolvedValue(updateUserResult)

			const updateUserDto: UpdateUserDto = {
				email: updateUserResult.email,
				password: updateUserResult.password,
				userName: updateUserResult.userName as string
			}

			const result = await request(app.getHttpServer())
				.put(`/users/${createUserResult.id}`)
				.send(updateUserDto)
				.expect(200)

			expect(result.body).toBeDefined()
			expect(result.body.id).toBe(updateUserResult.id)
			expect(result.body.email).toBe(updateUserResult.email)
			expect(result.body.userName).toBe(updateUserResult.userName)
			expect(result.body.updatedAt).toBe(formatDate(updateUserResult.updatedAt))
			expect(result.body.createdAt).toBe(formatDate(updateUserResult.createdAt))
		})
	})
})
