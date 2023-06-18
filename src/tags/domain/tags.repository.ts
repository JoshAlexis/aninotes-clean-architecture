import { TagsEntity } from 'tags/domain/tags.entity'

export interface TagsRepository {
	getAllTags(): Promise<TagsEntity[]>
	getTagById(id: string): Promise<TagsEntity>
	createTag(data: TagsEntity): Promise<TagsEntity>
	updateTag(id: string, newData: TagsEntity): Promise<TagsEntity>
}
