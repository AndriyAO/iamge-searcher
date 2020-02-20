import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ImageModule } from './modules/image/image.module';
import { UserModule } from './modules/user/user.module';
import { DbService } from './services/db/db.service';
import { HistoryModule } from './modules/history/history.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule, 
    ImageModule,
    HistoryModule, 
  ],
  controllers: [AppController],
  providers: [DbService],
  exports: [UserModule]
})
export class AppModule {}
