export class UserEntity {
	readonly id: string | undefined

	readonly userName: string

	readonly email: string

	readonly password: string

	createdAt: string | undefined

	updatedAt: string | undefined

	constructor(
		id: string | undefined,
		userName: string,
		email: string,
		password: string,
		createdAt: string | undefined,
		updatedAt: string | undefined
	) {
		this.id = id
		this.userName = userName
		this.email = email
		this.password = password
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}
