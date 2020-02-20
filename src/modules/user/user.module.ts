import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbService } from '../../services/db/db.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserService, DbService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
