import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { TagsRepository } from 'tags/domain/tags.repository'
import { TagsEntityMapper } from './tags-entity.mapper'
import { TagsEntity } from 'tags/domain/tags.entity'

@Injectable()
export class TagsPrismaRepository implements TagsRepository {
	constructor(private readonly prisma: PrismaService, private readonly mapper: TagsEntityMapper) {}

	async getAllTags(): Promise<TagsEntity[]> {
		const tags = await this.prisma.tag.findMany()

		return this.mapper.toTagEntityList(tags)
	}

	async getTagById(id: string): Promise<TagsEntity | null> {
		const tag = await this.prisma.tag.findUnique({
			where: {
				id
			}
		})

		if (tag === null) return null

		return this.mapper.toTagEntity(tag)
	}

	async createTag(data: TagsEntity): Promise<TagsEntity> {
		const createTag = await this.prisma.tag.create({
			data: {
				name: data.name,
				rated18: data.rated18
			}
		})

		return this.mapper.toTagEntity(createTag)
	}

	async updateTag(id: string, newData: TagsEntity): Promise<TagsEntity> {
		const tag = await this.prisma.tag.update({
			data: {
				name: newData.name,
				rated18: newData.rated18
			},
			where: {
				id
			}
		})

		return this.mapper.toTagEntity(tag)
	}
}
