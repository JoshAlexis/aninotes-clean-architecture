import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { CreateTagDto } from 'tags/domain/dto/create-tag.dto'
import { UpdateTagDto } from 'tags/domain/dto/update-tag.dto'
import { TagEntity } from 'tags/domain/tag.entity'
import { TagsRepository } from 'tags/domain/tags.repository'
import { TagsEntityMapper } from './tags-entity.mapper'

@Injectable()
export class TagsPrismaRepository implements TagsRepository<TagEntity> {
	constructor(private readonly prisma: PrismaService, private readonly mapper: TagsEntityMapper) {}

	async getAllTags(): Promise<TagEntity[]> {
		const tags = await this.prisma.tag.findMany()

		return this.mapper.toTagEntityList(tags)
	}

	async getTagById(id:string): Promise<TagEntity> {
		const tag = await this.prisma.tag.findUnique({
			where: {
				id
			}
		})

		if (!tag) {
			throw new NotFoundException({ message: `Tag with id ${id} not found` })
		}

		return this.mapper.toTagEntity(tag)
	}

	async createTag(data: CreateTagDto): Promise<TagEntity> {
		const createTag = await this.prisma.tag.create({
			data: {
				...data
			}
		})

		return this.mapper.toTagEntity(createTag)
	}

	async updateTag(id: string, newData: UpdateTagDto): Promise<TagEntity> {
		const tag = await this.prisma.tag.update({
			data: {
				...newData
			},
			where: {
				id
			}
		})

		return this.mapper.toTagEntity(tag)
	}
}
