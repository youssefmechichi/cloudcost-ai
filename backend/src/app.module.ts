import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { BillingModule } from './billing/billing.module';
import { StripeModule } from './stripe/stripe.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    PrometheusModule.register(),
    AiModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    SubscriptionsModule,
    BillingModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
