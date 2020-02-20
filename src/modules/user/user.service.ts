import { Injectable, NotAcceptableException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from 'src/interfaces';
import { DbService } from '../../services/db/db.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    private readonly COLLECTION_NAME = 'user';

    constructor(
        private databaseService: DbService,
        private authService: AuthService,
        ) { }
    
    createUser(data: User) {
        if (this.checkIfUserExist(data)) {
            throw new NotAcceptableException('User already exist');
        }
        const userId = this.databaseService.create(this.COLLECTION_NAME, data);
        const user = this.databaseService.getById(this.COLLECTION_NAME, userId);
        return this.databaseService.getById(this.COLLECTION_NAME, userId);        
    }

    getUserById(id: string): User {
        return this.databaseService.getById(this.COLLECTION_NAME, id);
    }

    getUserByEmail(email: string): User {
        return this.databaseService.getByKey(this.COLLECTION_NAME, 'email', email)[0];
    }

    getUserByUsername(username: string): User {
        return this.databaseService.getByKey(this.COLLECTION_NAME, 'username', username)[0];
    }

    login(data: User) {
        const user = this.databaseService.getByKey(this.COLLECTION_NAME, 'email', data.email)[0];
        if (!user) {
            throw new NotFoundException('User does not exist');
        }
        if (!this.comparePassword(data.password, user.password)) {
            throw new ForbiddenException('Forbidden');
        }
        return user;         
    }

    private checkIfUserExist(user: User) {
        return !!this.databaseService.getByKey(this.COLLECTION_NAME, 'email', user.email)[0] && 
        !!this.databaseService.getByKey(this.COLLECTION_NAME, 'username', user.username)[0];
    }

    private comparePassword(password: string, oldPassword: string) {
        return password === oldPassword;
    }
}
