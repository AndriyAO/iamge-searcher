import { Injectable, NotAcceptableException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from 'src/interfaces';
import { DbService } from '../../services/db/db.service';

@Injectable()
export class UserService {
    private readonly COLLECTION_NAME = 'user';

    constructor(private databaseServcie: DbService) { }
    
    createUser(user: User) {
        if (this.checkIfUserExist(user)) {
            throw new NotAcceptableException('User already exist');
        }
        const userId = this.databaseServcie.create(this.COLLECTION_NAME, user);
        return this.databaseServcie.getById(this.COLLECTION_NAME, userId);        
    }

    getUserById(id: string): User {
        return this.databaseServcie.getById(this.COLLECTION_NAME, id);
    }

    getUserByEmail(email: string): User {
        return this.databaseServcie.getByKey(this.COLLECTION_NAME, 'email', email)[0];
    }

    getUserByUsername(username: string): User {
        return this.databaseServcie.getByKey(this.COLLECTION_NAME, 'username', username)[0];
    }

    login(data: User) {
        const user = this.databaseServcie.getByKey(this.COLLECTION_NAME, 'email', data.email)[0];
        if (!user) {
            throw new NotFoundException('User does not exist');
        }
        if (!this.comparePassword(data.password, user.password)) {
            throw new ForbiddenException('Forbidden');
        }
        return user;         
    }

    private checkIfUserExist(user: User) {
        return !!this.databaseServcie.getByKey(this.COLLECTION_NAME, 'email', user.email)[0] && 
        !!this.databaseServcie.getByKey(this.COLLECTION_NAME, 'username', user.username)[0];
    }

    private comparePassword(password: string, oldPassword: string) {
        return password === oldPassword;
    }
}
