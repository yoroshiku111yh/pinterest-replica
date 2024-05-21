import { Controller } from '@nestjs/common';
import { UserFollowingService } from './user-following.service';

@Controller('user-following')
export class UserFollowingController {
  constructor(private readonly userFollowingService: UserFollowingService) {}
}
