export class PixivEntity {
	readonly id: string

	readonly pixivName: string

	readonly idPixiv: number

	readonly link: string

	readonly example: string

	readonly hasR18Content: boolean

	readonly favorite: number

	readonly quality: number

	constructor(
		id: string,
		pixivName: string,
		idPixiv: number,
		link: string,
		example: string,
		hasR18Content: boolean,
		favorite: number,
		quality: number
	) {
		this.id = id
		this.pixivName = pixivName
		this.idPixiv = idPixiv
		this.link = link
		this.example = example
		this.hasR18Content = hasR18Content
		this.favorite = favorite
		this.quality = quality
	}
}
