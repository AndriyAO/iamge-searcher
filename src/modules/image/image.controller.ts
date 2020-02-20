import { Controller, Get, Query, Post, Param, NotAcceptableException, Request, UseGuards } from '@nestjs/common';
import { get } from 'lodash';
import { ImageService } from './image.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HistoryService } from '../history/history.service';

@Controller('image')
export class ImageController {
    constructor(
        private imageService: ImageService,
        private historyService: HistoryService,
        ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getImages(
        @Query('query') query, 
        @Query('offset') offset,
        @Query('limit') limit,
        @Request() req
    ) {
        if (limit > 100) {
            throw new NotAcceptableException('Limit more than 100 not allowed.');
        }
        const searchOption = { 
            q: query, 
            offset: offset || 0, 
            limit: limit || 15
        };
        this.historyService.createHistory(req.user.id, query);
        return this.imageService.searchImages(searchOption, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/')
    likeImage(@Request() req, @Param('id') id) {
        return this.imageService.likeImage(id, req.user.userId);
    }
}
