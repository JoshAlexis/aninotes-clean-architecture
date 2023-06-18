export class PixivTagsItemEntity {
	readonly idPixivTag: string
	readonly name: string

	constructor(idPixivTag: string, name: string) {
		this.idPixivTag = idPixivTag
		this.name = name
	}
}
