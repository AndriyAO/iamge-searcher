import { Controller, Get, Query, Post, Param, NotAcceptableException, Request, UseGuards } from '@nestjs/common';
import { get } from 'lodash';
import { ImageService } from './image.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) {}

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
        const userId = get(req, 'user.id', null);
        return this.imageService.searchImages(
            { 
                q: query, 
                offset: offset || 0, 
                limit: limit || 15
            }, 
            userId);
    }

    @Post(':id/user/:userId')
    likeImage(@Param('id') id, @Param('userId') userId) {
        return this.imageService.likeImage(id, userId);
    }
}
