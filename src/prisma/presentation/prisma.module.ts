import { Global, Module } from '@nestjs/common'
import { PrismaService } from 'prisma/infrastructure/prisma.service'

@Global()
@Module({
	exports: [PrismaService]
})
export class PrismaModule {}
