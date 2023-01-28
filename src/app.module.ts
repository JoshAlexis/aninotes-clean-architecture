import { Module } from '@nestjs/common'
import { AppController } from 'app.controller'
import { AppService } from 'app.service'
import { PrismaModule } from 'prisma/infrastructure/prisma.module'
import { PrismaService } from 'prisma/infrastructure/prisma.service'
import { TagsModule } from 'tags/tags.module'
import { PixivModule } from 'pixiv/pixiv.module'

@Module({
	imports: [PrismaModule, TagsModule, PixivModule],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
