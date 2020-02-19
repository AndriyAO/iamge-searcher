import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImageModule } from './modules/image/image.module';
import { UserModule } from './modules/user/user.module';
import { DbService } from './services/db/db.service';

@Module({
  imports: [ImageModule, UserModule],
  controllers: [AppController],
  providers: [DbService],
})
export class AppModule {}
