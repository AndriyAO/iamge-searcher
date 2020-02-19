import { Controller, Get, Query, Post, Param, NotAcceptableException } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) {}

    @Get(':id')
    getImages(
        @Query('query') query, 
        @Query('offset') offset,
        @Query('limit') limit,
        @Param('id') userId,
    ) {
        if (limit > 100) {
            throw new NotAcceptableException('Limit more than 100 not allowed.');
        }
        return this.imageService.searchImages({ query, offset, limit }, userId);
    }

    @Post(':id/user/:userId')
    likeImage(@Param('id') id, @Param('userId') userId) {
        return this.imageService.likeImage(id, userId);
    }
}
