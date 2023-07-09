import { Test, TestingModule } from '@nestjs/testing'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import * as argon2 from 'argon2'
import dayjs from 'dayjs'
import { CreateUser } from 'users/application/create-user.use-case'
import { GetAllUsers } from 'users/application/get-all-users.use-case'
import { GetUserByEmail } from 'users/application/get-user-by-email.use-case'
import { UsersTokens } from 'users/di/users.tokens'
import { UserPrismaRepository } from 'users/infrastructure/user-prisma.repository'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { UsersEntityMapper } from 'users/infrastructure/users-entity.mapper'
import { createUserResult } from 'users/application/test/create-user-result.utils'
import { updateUserResult } from 'users/application/test/update-user-result.utils'
import { UpdateUser } from 'users/application/update-user.use-case'
import { UsersDtoEntityMapper } from 'users/application/dto/users-dto-entity.mapper'
import { GetUserById } from 'users/application/get-user-by-id.use-case'

describe('Users Use Cases', () => {
	let createUser: CreateUser
	let getAllUsers: GetAllUsers
	let getUserByEmail: GetUserByEmail
	let getUserById: GetUserById
	let updateUser: UpdateUser
	let prismaService: DeepMockProxy<PrismaService>

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: UsersTokens.USER_REPOSITORY,
					useClass: UserPrismaRepository
				},
				CreateUser,
				GetUserByEmail,
				GetAllUsers,
				UpdateUser,
				GetUserById,
				UsersEntityMapper,
				PrismaService,
				UsersDtoEntityMapper
			]
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaService>())
			.compile()

		createUser = app.get(CreateUser)
		getAllUsers = app.get(GetAllUsers)
		getUserByEmail = app.get(GetUserByEmail)
		updateUser = app.get(UpdateUser)
		getUserById = app.get(GetUserById)
		prismaService = app.get(PrismaService)
	})
	// TODO: make userName optional
	it('Should create a user', async () => {
		createUserResult.password = await argon2.hash('password')

		prismaService.user.create.mockResolvedValue(createUserResult)

		const result = await createUser.run({
			userName: createUserResult.userName as string,
			email: createUserResult.email,
			password: createUserResult.password
		})

		expect(prismaService.user.create).toHaveBeenCalled()
		expect(result.id).toBe(createUserResult.id)
		expect(result.userName).toBe(createUserResult.userName)
		expect(result.email).toBe(createUserResult.email)
		expect(result.createdAt).toBe(dayjs(createUserResult.createdAt).format('YYYY-MM-DD HH:mm:ss'))
		expect(result.updatedAt).toBe(dayjs(createUserResult.updatedAt).format('YYYY-MM-DD HH:mm:ss'))
	})

	it('Should fetch a list of users', async () => {
		createUserResult.password = await argon2.hash('password')
		prismaService.user.findMany.mockResolvedValue([createUserResult])

		const result = await getAllUsers.run()

		expect(prismaService.user.findMany).toHaveBeenCalled()
		expect(result).toHaveLength(1)
		expect(result[0].id).toBe(createUserResult.id)
		expect(result[0].userName).toBe(createUserResult.userName)
		expect(result[0].email).toBe(createUserResult.email)
		expect(result[0].createdAt).toBe(dayjs(createUserResult.createdAt).format('YYYY-MM-DD HH:mm:ss'))
		expect(result[0].updatedAt).toBe(dayjs(createUserResult.updatedAt).format('YYYY-MM-DD HH:mm:ss'))
	})

	it('Should fetch a user by its email', async () => {
		createUserResult.password = await argon2.hash('password')
		prismaService.user.findFirst.mockResolvedValue(createUserResult)

		const result = await getUserByEmail.run({
			email: createUserResult.email
		})

		expect(prismaService.user.findFirst).toHaveBeenCalled()
		expect(result.id).toBe(createUserResult.id)
		expect(result.userName).toBe(createUserResult.userName)
		expect(result.email).toBe(createUserResult.email)
		expect(result.createdAt).toBe(dayjs(createUserResult.createdAt).format('YYYY-MM-DD HH:mm:ss'))
		expect(result.updatedAt).toBe(dayjs(createUserResult.updatedAt).format('YYYY-MM-DD HH:mm:ss'))
	})

	it('Should fetch a user by id', async () => {
		prismaService.user.findUnique.mockResolvedValue(createUserResult)

		const result = await getUserById.run(createUserResult.id)

		expect(prismaService.user.findUnique).toHaveBeenCalled()
		expect(result.id).toBe(createUserResult.id)
		expect(result.userName).toBe(createUserResult.userName)
		expect(result.email).toBe(createUserResult.email)
		expect(result.createdAt).toBe(dayjs(createUserResult.createdAt).format('YYYY-MM-DD HH:mm:ss'))
		expect(result.updatedAt).toBe(dayjs(createUserResult.updatedAt).format('YYYY-MM-DD HH:mm:ss'))
	})

	it('Should update a user', async () => {
		createUserResult.password = await argon2.hash('password')
		prismaService.user.findUnique.mockResolvedValue(createUserResult)

		prismaService.user.update.mockResolvedValue({
			...updateUserResult
		})

		const result = await updateUser.run(updateUserResult.id, {
			email: updateUserResult.email,
			password: updateUserResult.password,
			userName: updateUserResult.userName as string
		})

		expect(prismaService.user.findUnique).toHaveBeenCalled()
		expect(prismaService.user.update).toHaveBeenCalled()
		expect(result.id).toBe(updateUserResult.id)
		expect(result.userName).toBe(updateUserResult.userName)
		expect(result.email).toBe(updateUserResult.email)
		expect(result.createdAt).toBe(dayjs(updateUserResult.updatedAt).format('YYYY-MM-DD HH:mm:ss'))
	})
})
