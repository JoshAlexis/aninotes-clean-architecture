import { Injectable } from '@nestjs/common'
import { PasswordHashingService } from 'users/application/services/password-hashing.service'
import * as argon2 from 'argon2'

@Injectable()
export class PasswordHashingArgonService implements PasswordHashingService {
	hash(password: string): string | Promise<string> {
		return argon2.hash(password)
	}
}
