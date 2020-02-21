import { Injectable } from '@nestjs/common';
import { DbService } from '../../services/db/db.service';
import { History } from 'src/interfaces';

@Injectable()
export class HistoryService {
    private readonly COLLECTION_NAME = process.env.COLLECTION_HISTORY;

    constructor(private databaseService: DbService) { }

    createHistory(userId: string, query: string): string {
        const data: History = {
            userId,
            query,
        };
        return this.databaseService.create(this.COLLECTION_NAME, data);
    }

    getHistoryByUserId(userId: string): History[] {
        return this.databaseService.getByKey(this.COLLECTION_NAME, 'userId', userId);
    }
}
