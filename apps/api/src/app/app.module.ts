import { Module } from '@nestjs/common';
import { PrismaModule } from '@budgette/api/data-access-db';
import { UserModule } from '@budgette/api/feature-user';

@Module({
    imports: [UserModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
