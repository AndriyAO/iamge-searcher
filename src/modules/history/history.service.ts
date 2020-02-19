import { Injectable } from '@nestjs/common';
import { DbService } from 'src/services/db/db.service';
import { History } from 'src/interfaces';

@Injectable()
export class HistoryService {
    private readonly COLLECTION_NAME = 'history';

    constructor(private databaseService: DbService) { }

    createHistory(data: History) {
        return this.databaseService.create(this.COLLECTION_NAME, data);
    }
}
