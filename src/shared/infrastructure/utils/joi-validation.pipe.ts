import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { ObjectSchema } from 'joi'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
	private schema: ObjectSchema

	contructor(schema: ObjectSchema) {
		this.schema = schema
	}

	transform(value: any, metadata: ArgumentMetadata) {
		const { error } = this.schema.validate(value)

		if (error) {
			throw new BadRequestException(error)
		}
		return value
	}
}
