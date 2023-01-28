export interface BaseRepository<Entity, Tag> {
	getAll(page: number, size: number): Promise<Entity[]>
	getById(id: number): Promise<Entity>
	deleteTag(idRecordRelation: number): Promise<boolean>
	assignTag(idEntity: number, idTag: number): Promise<Tag>
}
