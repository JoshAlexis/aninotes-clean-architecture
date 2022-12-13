export interface BaseRepository<Entity, Tag> {
	getAll(): Promise<Entity[]>
	getById(id: number): Promise<Entity>
	deleteTag(idRecordRelation: number): Promise<boolean>
	updateTag(idTagRelation: number, idTag: number): Promise<boolean>
	assignTag(idEntity: number, idTag: number): Promise<Tag>
}
