import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { History } from 'src/interfaces';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('history')
export class HistoryController {
    constructor(private historyService: HistoryService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getHistoryByUserId(@Request() req): History[] {
        return this.historyService.getHistoryByUserId(req.user.userId);
    }
}
