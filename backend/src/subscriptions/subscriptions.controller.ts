import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionsService } from './subscriptions.service';

type AuthenticatedRequest = {
  user: {
    userId: string;
    email: string;
  };
};

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: AuthenticatedRequest) {
    return this.subscriptionsService.getMySubscription(req.user.userId);
  }
}
