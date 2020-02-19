import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { History } from 'src/interfaces';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(private historyService: HistoryService) { }

    @Post()
    createHistory(@Body() data: History) {
        return this.historyService.createHistory(data);
    }

    @Get('user/:id')
    getHistoryByUserId(@Param('id') id) {
        return this.historyService.getHistoryByUserId(id);
    }
}
