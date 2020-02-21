import { Module } from '@nestjs/common';
import { DbService } from '../../services/db/db.service';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
    providers: [HistoryService, DbService],
    controllers: [HistoryController],
    exports: [HistoryService]
})
export class HistoryModule {}
