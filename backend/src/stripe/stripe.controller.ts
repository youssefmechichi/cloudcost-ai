import { Controller, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { StripeService } from './stripe.service';
import type { RawBodyRequest } from '@nestjs/common';

type AuthenticatedRequest = {
  user: {
    userId: string;
    email: string;
  };
};

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('checkout')
  createCheckout(@Req() req: AuthenticatedRequest) {
    return this.stripeService.createCheckoutSession(req.user.userId);
  }

  @Post('webhook')
  handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.stripeService.handleWebhook(req.rawBody as Buffer, signature);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('billing-portal')
  createBillingPortal(@Req() req: AuthenticatedRequest) {
    return this.stripeService.createBillingPortal(req.user.userId);
  }
}
