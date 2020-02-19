import { Injectable } from '@nestjs/common';
import { DataStore } from 'notarealdb';
import { find } from 'lodash';
import { Image, User, History } from 'src/interfaces';

@Injectable()
export class DbService {
    private store;
    constructor() {
        this.store = new DataStore('./')
    }

    create(collection: string, data: User | Image | History) {
        return this.store.collection(collection).create(data);
    }

    update(collection: string, data: User | Image | History) {
        return this.store.collection(collection).update(data);
    }

    getById(collection: string, id: string) {
        return this.store.collection(collection).get(id);
    }

    delete(collection: string, id: string) {
        return this.store.collection(collection).delete(id);
    }

    getByKey(collection: string, key: string, value: string) {
        const searchOption = {};
        searchOption[key] = value;
        return find(this.getAll(collection), searchOption);
    }

    getAll(collection) {
        return this.store.collection(collection).list();
    }
}
