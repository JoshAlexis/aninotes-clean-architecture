import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { ValidationPipe, VersioningType } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(helmet())
	app.enableCors()
	app.setGlobalPrefix('api')
	app.enableVersioning({
		type: VersioningType.URI
	})
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			forbidUnknownValues: true,
			validationError: {
				value: false
			}
		})
	)

	await app.listen(3000)
}
bootstrap()
