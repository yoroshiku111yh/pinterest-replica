import { Module } from '@nestjs/common';
import { UserFollowingService } from './user-following.service';
import { UserFollowingController } from './user-following.controller';

@Module({
  controllers: [UserFollowingController],
  providers: [UserFollowingService],
  exports : [UserFollowingService]
})
export class UserFollowingModule {}
