export interface BaseRepository<Entity, Tag> {
	getAll(page: number, size: number): Promise<Entity[]>
	getById(id: string): Promise<Entity | null>
	deleteTag(idRecordRelation: string): Promise<boolean>
	assignTag(idEntity: string, idTag: string): Promise<Tag>
}
