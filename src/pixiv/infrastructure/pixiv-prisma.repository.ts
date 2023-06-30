import { Injectable } from '@nestjs/common'
import { PixivRepository } from 'pixiv/domain/pixiv.repository'
import { PixivEntity } from 'pixiv/domain/pixiv.entity'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { PixivEntityMapper } from 'pixiv/infrastructure/pixiv-entity.mapper'
import { PixivTagEntity } from 'pixiv/domain/pixiv-tag.entity'
import { calculateSkipRecords } from 'shared/infrastructure/utils/calculateSkipRecords'
import { PixivWithTagsDto } from 'pixiv/infrastructure/pixiv-with-tags.dto'
import { PixivTagsItemEntity } from 'pixiv/domain/pixiv-tags-item.entity'

@Injectable()
export class PixivPrismaRepository implements PixivRepository {
	constructor(private readonly prismaService: PrismaService, private readonly mapper: PixivEntityMapper) {}

	async createPixiv(data: PixivEntity): Promise<PixivEntity> {
		const createdPixiv = await this.prismaService.pixiv.create({
			data: {
				idPixiv: data.idPixiv,
				pixivName: data.pixivName,
				quality: data.quality,
				favorite: data.favorite,
				link: data.link,
				hasR18Content: data.hasR18Content,
				example: data.example
			}
		})

		return this.mapper.toEntity(createdPixiv)
	}

	async deleteTag(idRecordRelation: string): Promise<boolean> {
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

	async getById(id: string): Promise<PixivEntity | null> {
		const pixiv = await this.prismaService.pixiv.findUnique({
			where: {
				id
			}
		})

		if (pixiv === null) return null

		return this.mapper.toEntity(pixiv)
	}

	async getByIdPixiv(idPixiv: number): Promise<PixivEntity | null> {
		const item = await this.prismaService.pixiv.findUnique({
			where: {
				idPixiv
			}
		})

		if (!item) return null

		return this.mapper.toEntity(item)
	}

	async updatePixiv(id: string, data: PixivEntity): Promise<PixivEntity> {
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

	async assignTag(idEntity: string, idTag: string): Promise<PixivTagEntity> {
		const createdTag = await this.prismaService.pixivTags.create({
			data: {
				pixivId: idEntity,
				tagId: idTag
			}
		})

		return this.mapper.toPixivTagEntity(createdTag)
	}

	async getPixivTags(id: string): Promise<ReadonlyArray<PixivTagsItemEntity>> {
		const pixivTagList = (await this.prismaService.pixiv.findFirst({
			where: {
				id
			},
			select: {
				tags: {
					select: {
						id: true,
						tag: {
							select: {
								name: true
							}
						}
					}
				}
			}
		})) as PixivWithTagsDto

		return this.mapper.toPixivItemTagsEntity(pixivTagList)
	}
}
