import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { DbService } from 'src/services/db/db.service';

@Module({
    controllers: [ImageController],
    providers: [ImageService, DbService],
})
export class ImageModule {}
