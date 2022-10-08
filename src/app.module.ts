import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/presentation/prisma.module'
import { PrismaService } from './prisma/infrastructure/prisma.service'

@Module({
	imports: [PrismaModule],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
