import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	InternalServerErrorException,
	NotFoundException,
	CallHandler
} from '@nestjs/common'
import { Observable, throwError, catchError } from 'rxjs'
import { UserNotFoundError } from 'users/domain/user-not-found.error'

@Injectable()
export class UsersErrorInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(catchError((err) => this.mapToError(err)))
	}

	private mapToError(error: any) {
		if (error instanceof UserNotFoundError) {
			return throwError(() => new NotFoundException(error.message))
		}
		return throwError(() => new InternalServerErrorException(error.message))
	}
}
