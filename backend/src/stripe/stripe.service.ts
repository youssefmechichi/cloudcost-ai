import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StripeService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  constructor(private prisma: PrismaService) {}

  async createCheckoutSession(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        organization: {
          include: {
            subscription: true,
          },
        },
      },
    });

    if (!user?.organization || !user.organization.subscription) {
      throw new BadRequestException('User organization or subscription not found');
    }

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email,
      line_items: [
        {
          price: process.env.STRIPE_PRO_PRICE_ID as string,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard?upgrade=success`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard?upgrade=cancelled`,
      metadata: {
        organizationId: user.organization.id,
        subscriptionId: user.organization.subscription.id,
        userId: user.id,
      },
    });

    return {
      url: session.url,
    };
  }

  async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const organizationId = session.metadata?.organizationId;

    if (!organizationId) {
      return;
    }

    await this.prisma.subscription.update({
      where: {
        organizationId,
      },
      data: {
        plan: 'PRO',
        status: 'ACTIVE',
        stripeCustomerId:
          typeof session.customer === 'string' ? session.customer : session.customer?.id,
        stripeSubscriptionId:
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id,
        stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
      },
    });
  }

  async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await this.prisma.subscription.updateMany({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        plan: 'FREE',
        status: 'CANCELED',
      },
    });
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
    } catch {
      throw new BadRequestException('Invalid Stripe webhook signature');
    }

    if (event.type === 'checkout.session.completed') {
    await this.handleCheckoutCompleted(
        event.data.object as Stripe.Checkout.Session,
    );
    }

    if (event.type === 'customer.subscription.deleted') {
    await this.handleSubscriptionDeleted(
        event.data.object as Stripe.Subscription,
    );
    }

    return { received: true };
  }

  async createBillingPortal(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    include: {
      organization: {
        include: {
          subscription: true,
        },
      },
    },
  });

  const customerId =
    user?.organization?.subscription?.stripeCustomerId;

  if (!customerId) {
    throw new BadRequestException(
      "No Stripe customer found.",
    );
  }

  const session =
    await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.FRONTEND_URL}/pricing`,
    });

  return {
    url: session.url,
  };
}
}