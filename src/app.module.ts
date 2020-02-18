import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImageService } from './image/image.service';
import { ImageController } from './image/image.controller';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';

@Module({
  imports: [],
  controllers: [AppController, ImageController, HistoryController],
  providers: [ImageService, HistoryService],
})
export class AppModule {}
