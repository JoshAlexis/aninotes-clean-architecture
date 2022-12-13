import { Test, TestingModule } from '@nestjs/testing'
import { CreatePixiv } from 'pixiv/application/create-pixiv.use-case'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { PixivTokens } from 'pixiv/di/pixiv.tokens'
import { UpdatePixiv } from 'pixiv/application/update-pixiv.use-case'
import { CreatePixivDto } from 'pixiv/domain/dto/create-pixiv.dto'
import { CreateTagDto } from 'tags/domain/dto/create-tag.dto'
import { PixivPrismaRepository } from 'pixiv/infrastructure/pixiv-prisma.repository'
import { PixivEntityMapper } from 'pixiv/infrastructure/pixiv-entity.mapper'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'

describe('Pixiv Use Case', () => {
	let createPixiv: CreatePixiv
	let updatePixiv: UpdatePixiv

	let prismaService: PrismaService

	beforeAll(() => {
		prismaService = new PrismaService()
	})

	beforeEach(async () => {
		// await prismaService.pixivTags.deleteMany()
		// await prismaService.pixiv.deleteMany()
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: PixivTokens.PIXIV_REPOSITORY,
					useClass: PixivPrismaRepository
				},
				CreatePixiv,
				UpdatePixiv,
				PixivEntityMapper
			],
			imports: [PrismaModule]
		}).compile()

		createPixiv = app.get<CreatePixiv>(CreatePixiv)
		updatePixiv = app.get<UpdatePixiv>(UpdatePixiv)
	})

	afterAll(async () => {
		await prismaService.pixivTags.deleteMany()
		await prismaService.pixiv.deleteMany()
		await prismaService.tag.deleteMany()
		await prismaService.$disconnect()
	})

	test('Should create pixiv item', async () => {
		const tag: CreateTagDto = {
			name: 'test',
			rated18: false
		}

		const createdTag = await prismaService.tag.create({
			data: {
				...tag
			}
		})

		const data: CreatePixivDto = {
			idPixiv: 12312412,
			pixivName: "L'vin",
			link: 'https://www.pixiv.net/en/users/38183633',
			quality: 4,
			favorite: 3,
			tags: [
				{
					id: createdTag.id
				}
			]
		}

		const [pixiv, tagsList] = await createPixiv.run(data)

		expect(pixiv.id).toBeGreaterThan(0)
		expect(pixiv.idPixiv).toBe(data.idPixiv)
		expect(pixiv.pixivName).toBe(data.pixivName)
		expect(pixiv.link).toBe(data.link)
		expect(pixiv.quality).toBe(data.quality)
		expect(pixiv.favorite).toBe(data.favorite)

		expect(tagsList).toHaveLength(data.tags.length)
	})
})
