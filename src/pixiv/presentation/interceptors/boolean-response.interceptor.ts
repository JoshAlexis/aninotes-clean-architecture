import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

export interface Response<T> {
	result: T
}

export class BooleanResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
		return next.handle().pipe(map((data) => ({ result: data })))
	}
}
