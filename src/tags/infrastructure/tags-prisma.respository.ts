import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { TagEntity } from 'tags/domain/tag.entity'
import { TagsRepository } from 'tags/domain/tags.repository'

@Injectable()
export class TagsPrismaRepository implements TagsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getAllTags(): Promise<any[]> {
		return this.prisma.tag.findMany()
	}

	async getTagById(id: number): Promise<any> {
		return this.prisma.tag.findUnique({
			where: {
				id
			}
		})
	}

	async createTag(data: TagEntity): Promise<any> {
		return this.prisma.tag.create({
			data: {
				...data
			}
		})
	}

	async updateTag(id: number, newData: TagEntity): Promise<any> {
		return this.prisma.tag.update({
			data: {
				...newData
			},
			where: {
				id
			}
		})
	}
}
