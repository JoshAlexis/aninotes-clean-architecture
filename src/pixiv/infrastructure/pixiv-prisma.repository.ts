import { Injectable, NotFoundException } from '@nestjs/common'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { CreatePixivDto } from 'pixiv/domain/dto/create-pixiv.dto'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { UpdatePixivDto } from 'pixiv/domain/dto/update-pixiv.dto'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { PixivEntityMapper } from 'pixiv/infrastructure/pixiv-entity.mapper'
import { PixivTagEntity } from 'pixiv/domain/pixiv-tag.entity'
import { calculateSkipRecords } from 'shared/infrastructure/utils/calculateSkipRecords'

@Injectable()
export class PixivPrismaRepository implements PixivRepository {
	constructor(private readonly prismaService: PrismaService, private readonly mapper: PixivEntityMapper) {}

	async createPixiv(data: CreatePixivDto): Promise<PixivEntity> {
		const createdPixiv = await this.prismaService.pixiv.create({
			data: {
				idPixiv: data.idPixiv,
				pixivName: data.pixivName,
				quality: data.quality,
				favorite: data.favorite,
				link: data.link
			}
		})

		return this.mapper.toEntity(createdPixiv)
	}

	async deleteTag(idRecordRelation: number): Promise<boolean> {
		const deletedRecord = await this.prismaService.pixivTags.delete({
			where: {
				id: idRecordRelation
			}
		})

		return !!deletedRecord
	}

	async getAll(page: number, size: number): Promise<PixivEntity[]> {
		const pixivItems = await this.prismaService.pixiv.findMany({
			skip: calculateSkipRecords(page, size),
			take: size
		})

		return this.mapper.toEntityList(pixivItems)
	}

	async getById(id: number): Promise<PixivEntity> {
		const pixiv = await this.prismaService.pixiv.findUnique({
			where: {
				id
			}
		})

		if (!pixiv) {
			throw new NotFoundException(`There is not a pixiv item with id ${id}`)
		}

		return this.mapper.toEntity(pixiv)
	}

	async getByIdPixiv(idPixiv: number): Promise<PixivEntity> {
		const item = await this.prismaService.pixiv.findFirst({
			where: {
				idPixiv
			}
		})

		if (!item) {
			throw new NotFoundException(`There is not a pixiv item with idPixiv ${idPixiv}`)
		}

		return this.mapper.toEntity(item)
	}

	async updatePixiv(id: number, data: UpdatePixivDto): Promise<PixivEntity> {
		const updatedPixiv = await this.prismaService.pixiv.update({
			where: {
				id
			},
			data: {
				...data
			}
		})

		return this.mapper.toEntity(updatedPixiv)
	}

	async assignTag(idEntity: number, idTag: number): Promise<PixivTagEntity> {
		const createdTag = await this.prismaService.pixivTags.create({
			data: {
				pixivId: idEntity,
				tagId: idTag
			}
		})

		return this.mapper.toPixivTagEntity(createdTag)
	}
}
