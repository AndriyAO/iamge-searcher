import { Injectable } from '@nestjs/common';
import { DataStore } from 'notarealdb';
import { Image, User, History, Like } from 'src/interfaces';

@Injectable()
export class DbService {
    private store;
    constructor() {
        this.store = new DataStore(process.env.DATA_STORAGE)
    }

    create(collection: string, data: User | Like | History): string {
        return this.store.collection(collection).create(data);
    }

    update(collection: string, data: User | Like | History) {
        return this.store.collection(collection).update(data);
    }

    getById(collection: string, id: string) {
        return this.store.collection(collection).get(id);
    }

    delete(collection: string, id: string) {
        return this.store.collection(collection).update({ id, is_delete: true});
    }

    getByKey(collection: string, key: string, value: string) {
        const searchOption = {};
        searchOption[key] = value;
        return this.getAll(collection).filter(item => item[key] === value);
    }

    getAll(collection) {
        return this.store.collection(collection).list();
    }
}
