import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	NotFoundException,
	InternalServerErrorException
} from '@nestjs/common'
import { Observable, throwError, catchError } from 'rxjs'
import { PixivByIdPixivNotFoundError } from 'pixiv/domain/errors/pixiv-by-id-pixiv-not-found.error'
import { PixivNotFoundError } from 'pixiv/domain/errors/pixiv-not-found.error'

@Injectable()
export class PixivErrorsInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(catchError((err) => this.mapToError(err)))
	}

	private mapToError(error: any) {
		if (error instanceof PixivByIdPixivNotFoundError) {
			return throwError(() => new NotFoundException(error.message))
		} else if (error instanceof PixivNotFoundError) {
			return throwError(() => new NotFoundException(error.message))
		}
		return throwError(() => new InternalServerErrorException(error.message))
	}
}
