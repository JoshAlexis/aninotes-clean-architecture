export class TagNotFoundError extends Error {
	constructor() {
		super(`Tag not found`)

		this.name = this.constructor.name
		Error.captureStackTrace(this, TagNotFoundError)
	}
}
