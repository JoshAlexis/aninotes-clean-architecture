export class TagsEntity {
	readonly id: string
	readonly name: string
	readonly rated18: boolean
	readonly createdAt: string
	readonly updatedAt: string

	constructor(id: string, name: string, rated18: boolean, createdAt: string, updatedAt: string) {
		this.id = id
		this.name = name
		this.rated18 = rated18
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}
