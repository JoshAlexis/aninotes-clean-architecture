export class UserNotFoundError extends Error {
	constructor() {
		super('User does not exists')
		this.name = this.constructor.name
		Error.captureStackTrace(this, UserNotFoundError)
	}
}
