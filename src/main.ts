import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
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

	const config = new DocumentBuilder()
		.setTitle('Aninotes')
		.setDescription('The Aninotes API for saving illustrators and sauces')
		.setVersion('1.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	app.enableShutdownHooks()

	await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000)
}
bootstrap()
