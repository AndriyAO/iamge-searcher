import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { History } from 'src/interfaces';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('history')
export class HistoryController {
    constructor(private historyService: HistoryService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getHistoryByUserId(@Param('id') id) {
        return this.historyService.getHistoryByUserId(id);
    }
}
