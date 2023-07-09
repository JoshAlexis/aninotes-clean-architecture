import { INestApplication, ValidationPipe } from '@nestjs/common'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { UsersModule } from 'users/users.module'
import request from 'supertest'
import { updateUserResult } from 'users/application/test/update-user-result.utils'
import { UpdateUserInputDto } from 'users/application/dto'

describe('User Endpoint (e2e) - Errors Responses', () => {
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

	describe('PutUsersController', () => {
		it('PUT /api/v1/users', async () => {
			prismaService.user.findUnique.mockResolvedValue(null)

			const updateUserDto: UpdateUserInputDto = {
				email: updateUserResult.email,
				password: updateUserResult.password,
				userName: updateUserResult.userName as string
			}

			const result = await request(app.getHttpServer()).put('/users/1').send(updateUserDto)

			expect(result).toBeDefined()
			expect(prismaService.user.findUnique).toHaveBeenCalled()
		})
	})
})
