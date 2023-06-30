export class PixivByIdPixivNotFoundError extends Error {
	constructor(idPixiv: number) {
		super(`There is not a pixiv item with idPixiv ${idPixiv}`)
		this.name = this.constructor.name
		Error.captureStackTrace(this, PixivByIdPixivNotFoundError)
	}
}
