export interface PasswordHashingService {
	hash(password: string): string | Promise<string>
}
