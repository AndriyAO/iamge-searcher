import { Controller, Get, Query, Post, Param, HttpException, NotAcceptableException } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) {}

    @Get()
    getImages(
        @Query('query') query, 
        @Query('offset') offset,
        @Query('limit') limit,
    ) {
        if (limit > 100) {
            throw new NotAcceptableException('Limit more than 100 not allowed.');
        }
        return this.imageService.searchImages({ query, offset, limit });
    }

    @Post(':id')
    likeImage(@Param('id') id) {
        return this.imageService.likeImage(id);
    }
}
