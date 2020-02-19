import { Injectable, HttpException, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from 'src/interfaces';
import { DbService } from 'src/services/db/db.service';

@Injectable()
export class UserService {
    constructor(private databaseServcie: DbService) { }
    createUser(user: User) {
        return this.databaseServcie.create('user', user);        
    }

    getUserById(id: string): User {
        return this.databaseServcie.getById('user', id);
    }

    getUserByEmail(email: string): User {
        return this.databaseServcie.getByKey('user', 'email', email);
    }

    login(data: User) {
        const user = this.databaseServcie.getByKey('user', 'email', data.email);
        if (!user) {
            throw new Error('User does not exist');
        }
        if (!this.comparePassword(data.password, user.password)) {
            throw new Error('Forbidden');
        }
        return user;         
    }

    private comparePassword(password: string, oldPassword: string) {
        return password === oldPassword;
    }
}
