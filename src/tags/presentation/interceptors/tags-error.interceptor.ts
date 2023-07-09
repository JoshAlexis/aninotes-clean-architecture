import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	NotFoundException,
	InternalServerErrorException,
	BadRequestException
} from '@nestjs/common'
import { Observable, throwError, catchError } from 'rxjs'
import { TagNotFoundError } from 'tags/domain/errors/tag-not-found.error'

@Injectable()
export class TagsErrorInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(catchError((err) => this.mapToError(err)))
	}

	private mapToError(error: any) {
		if (error instanceof TagNotFoundError) {
			return throwError(() => new NotFoundException(error.message))
		}
		if (error instanceof BadRequestException) {
			return throwError(() => error)
		}
		return throwError(() => new InternalServerErrorException(error.message))
	}
}
