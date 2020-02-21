import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { DbService } from '../../services/db/db.service';
import { HistoryModule } from '../history/history.module';

@Module({
    imports: [HistoryModule],
    controllers: [ImageController],
    providers: [ImageService, DbService],
})
export class ImageModule {}
