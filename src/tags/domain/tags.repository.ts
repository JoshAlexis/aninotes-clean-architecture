import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'

export interface TagsRepository<T = unknown> {
	getAllTags(): Promise<T[]>
	getTagById(id: string): Promise<T>
	createTag(data: CreateTagDto): Promise<T>
	updateTag(id: string, newData: UpdateTagDto): Promise<T>
}
