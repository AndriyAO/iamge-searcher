import { Module } from '@nestjs/common';
import { DbService } from 'src/services/db/db.service';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
    providers: [HistoryService, DbService],
    controllers: [HistoryController]
})
export class HistoryModule {}
