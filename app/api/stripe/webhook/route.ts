import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export const config = {
  api: {
    bodyParser: false
  }
};

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature.' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    return NextResponse.json({ error: 'Webhook verification failed.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan || 'free';

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { plan }
      });

      await prisma.subscription.upsert({
        where: { userId },
        update: {
          plan,
          status: 'active',
          stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
          stripeSubscriptionId: typeof session.subscription === 'string' ? session.subscription : null
        },
        create: {
          userId,
          plan,
          status: 'active',
          stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
          stripeSubscriptionId: typeof session.subscription === 'string' ? session.subscription : null
        }
      });
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const user = await prisma.user.findFirst({
      where: {
        subscriptions: {
          some: {
            stripeSubscriptionId: subscription.id
          }
        }
      }
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { plan: 'free' }
      });

      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { plan: 'free', status: 'canceled' }
      });
    }
  }

  return NextResponse.json({ received: true });
}
