import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async getMySubscription(userId: string) {
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

    if (!user || !user.organization || !user.organization.subscription) {
      throw new NotFoundException('Subscription not found');
    }

    const subscription = user.organization.subscription;

    return {
      organizationId: user.organization.id,
      organizationName: user.organization.name,
      plan: subscription.plan,
      status: subscription.status,
      canUseAI: subscription.plan === 'PRO' && subscription.status === 'ACTIVE',
    };
  }
}
