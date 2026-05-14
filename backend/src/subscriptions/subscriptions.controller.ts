import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req) {
    return this.subscriptionsService.getMySubscription(req.user.userId);
  }
}