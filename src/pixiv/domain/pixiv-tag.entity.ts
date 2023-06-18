export class PixivTagEntity {
	readonly id: string

	readonly idPixiv: string

	readonly idTag: string

	constructor(id: string, idPixiv: string, idTag: string) {
		this.id = id
		this.idPixiv = idPixiv
		this.idTag = idTag
	}
}
