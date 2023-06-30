export class PixivNotFoundError extends Error {
	constructor(id: string) {
		super(`There is not a pixiv item with id ${id}`)
		this.name = this.constructor.name
		Error.captureStackTrace(this, PixivNotFoundError)
	}
}
