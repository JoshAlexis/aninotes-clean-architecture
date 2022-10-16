import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'

export interface TagsRepository<T = any> {
	getAllTags(): Promise<T[]>
	getTagById(id: number): Promise<T>
	createTag(data: CreateTagDto): Promise<T>
	updateTag(id: number, newData: UpdateTagDto): Promise<T>
}
