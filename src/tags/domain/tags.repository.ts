import { TagEntity } from './tag.entity'

export interface TagsRepository {
	getAllTags(): Promise<any[]>
	getTagById(id: number): Promise<any>
	createTag(data: TagEntity): Promise<any>
	updateTag(id: number, newData: TagEntity): Promise<any>
}
