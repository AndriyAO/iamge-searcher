import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImageModule } from './modules/image/image.module';
import { UserModule } from './modules/user/user.module';
import { DbService } from './services/db/db.service';
import { HistoryModule } from './modules/history/history.module';

@Module({
  imports: [ImageModule, UserModule, HistoryModule],
  controllers: [AppController],
  providers: [DbService],
})
export class AppModule {}
