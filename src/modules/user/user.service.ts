import { Injectable } from '@nestjs/common';
import { DataStore } from 'notarealdb'
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
    createUser(user: User) {
        
    }
}
