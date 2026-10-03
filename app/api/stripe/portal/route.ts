import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const body = await request.json();
  const plan = String(body.plan || 'pro');

  const priceId = plan === 'business' ? process.env.STRIPE_BUSINESS_PRICE_ID : process.env.STRIPE_PRO_PRICE_ID;

  if (!priceId) {
    return NextResponse.json({ error: 'Plan price not configured.' }, { status: 400 });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing?checkout=cancelled`,
    client_reference_id: session.user.id,
    metadata: {
      userId: session.user.id,
      plan
    }
  });

  return NextResponse.json({ url: checkout.url });
}
