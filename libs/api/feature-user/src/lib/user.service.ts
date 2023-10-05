import { Injectable } from '@nestjs/common';
import { PrismaService } from '@budgette/api/data-access-db';
import { User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    //TODO fix forbidden non-null assertion on 12 and 15 lines
    constructor(private readonly prismaService: PrismaService) {}
    public create(user: Partial<User>) {
        const hashedPassword: string = this.hashPassword(user.password!);
        return this.prismaService.user.create({
            data: {
                email: user.email!,
                password: hashedPassword,
                roles: ['USER'],
            },
        });
    }

    public findOne(idOrEmail: string) {
        return this.prismaService.user.findFirst({
            where: {
                OR: [{ id: idOrEmail }, { email: idOrEmail }],
            },
        });
    }

    public delete(id: string) {
        return this.prismaService.user.delete({
            where: {
                id: id,
            },
        });
    }

    private hashPassword(password: string): string {
        return hashSync(password, genSaltSync(10));
    }
}
