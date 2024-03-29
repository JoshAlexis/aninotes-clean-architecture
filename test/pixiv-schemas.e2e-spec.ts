import request from 'supertest'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { mockDeep } from 'jest-mock-extended'
import { PixivModule } from 'pixiv/pixiv.module'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { TagsModule } from 'tags/tags.module'
import { CreatePixivInputDto } from 'pixiv/application/dto/create-pixiv-input.dto'
import { createPixivData } from 'pixiv/application/test/create-pixiv.data'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'

describe('Pixiv Schemas', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PixivModule, TagsModule, PrismaModule],
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

	describe('Create Pixiv', () => {
		it('Should fail when empty object is sent', async () => {
			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send({})

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field idPixiv is 0', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				idPixiv: 0
			}

			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field quality is 0', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				quality: 0
			}

			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field favorite is 0', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				favorite: 0
			}

			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field link is empty', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				link: ''
			}
			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field link is not from pixiv', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				link: 'https://www.artstation.com/artwork/r98AyO'
			}
			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field link is not of pixiv user', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				link: 'https://www.pixiv.net/en/artworks/93435536'
			}
			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field example is empty', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				example: ''
			}
			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field example is not from pixiv', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				example: 'https://www.artstation.com/artwork/r98AyO'
			}
			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field example is not from pixiv original image', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				example: 'https://www.pixiv.net/en/artworks/38183633'
			}
			const pixivResult = await request(app.getHttpServer()).post('/pixiv').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})
	})

	describe('Update Pixiv', () => {
		it('Should fail when empty object is sent', async () => {
			const pixivResult = await request(app.getHttpServer()).put('/pixiv/1').send({})

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field idPixiv is 0', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				idPixiv: 0
			}

			const pixivResult = await request(app.getHttpServer()).put('/pixiv/1').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field quality is 0', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				quality: 0
			}

			const pixivResult = await request(app.getHttpServer()).put('/pixiv/1').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field favorite is 0', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				favorite: 0
			}

			const pixivResult = await request(app.getHttpServer()).put('/pixiv/1').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field link is empty', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				link: ''
			}
			const pixivResult = await request(app.getHttpServer()).put('/pixiv/1').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field link is not from pixiv', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				link: 'https://www.artstation.com/artwork/r98AyO'
			}
			const pixivResult = await request(app.getHttpServer()).put('/pixiv/1').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field link is not of pixiv user', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				link: 'https://www.pixiv.net/en/artworks/93435536'
			}
			const pixivResult = await request(app.getHttpServer()).put('/pixiv/1').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field example is empty', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				example: ''
			}
			const pixivResult = await request(app.getHttpServer()).put('/pixiv/1').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field example is not from pixiv', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				example: 'https://www.artstation.com/artwork/r98AyO'
			}
			const pixivResult = await request(app.getHttpServer()).put('/pixiv/1').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})

		it('Should fail when field example is not from pixiv original image', async () => {
			const createPixiv: CreatePixivInputDto = {
				...createPixivData,
				example: 'https://www.pixiv.net/en/artworks/38183633'
			}
			const pixivResult = await request(app.getHttpServer()).put('/pixiv/1').send(createPixiv)

			expect(pixivResult.status).toBe(400)
		})
	})
})
