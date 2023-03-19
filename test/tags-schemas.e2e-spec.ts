import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { mockDeep } from 'jest-mock-extended'
import { TagsModule } from 'tags/tags.module'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { CreateTagDto } from 'tags/domain/dto/create-tag.dto'

describe('Tags Schemas', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [TagsModule],
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
		await app.init()
	})

	it('Should fail when empty object is sent', async () => {
		const result = await request(app.getHttpServer()).post('/tags').send({})

		expect(result.status).toBe(400)
	})

	it('Should fail when field name is empty', async () => {
		const createTag: CreateTagDto = {
			name: '',
			rated18: false
		}
		const result = await request(app.getHttpServer()).post('/tags').send(createTag)

		expect(result.status).toBe(400)
	})

	it('Should fail when field rated18 is not a boolean', async () => {
		const createTag: CreateTagDto = {
			name: 'test',
			rated18: '' as any
		}
		const result = await request(app.getHttpServer()).post('/tags').send(createTag)

		expect(result.status).toBe(400)
	})
})
