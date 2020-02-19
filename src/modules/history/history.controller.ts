import { Controller, Post, Body, Param } from '@nestjs/common';
import { History } from 'src/interfaces';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(private historyService: HistoryService) { }

    @Post()
    createHistory(@Body() data: History) {
        return this.historyService.createHistory(data);
    }
}
