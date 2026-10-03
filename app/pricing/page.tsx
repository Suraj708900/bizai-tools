import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getUsageStats } from '@/lib/usage';

export default async function PricingPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id ? await prisma.user.findUnique({ where: { id: session.user.id } }) : null;
  const currentPlan = user?.plan || 'free';
  const usage = session?.user?.id ? await getUsageStats(session.user.id, currentPlan) : null;

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: '5 generations per day',
      features: ['5 generations/day', 'All base business tools', 'Basic document export'],
      featured: false,
      plan: 'free'
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      description: '100 generations/month',
      features: ['100 generations/month', 'Unlimited daily tasks', 'Priority AI output speed'],
      featured: true,
      plan: 'pro'
    },
    {
      name: 'Business',
      price: '$29',
      period: '/month',
      description: '500 generations/month',
      features: ['500 generations/month', 'Advanced workspace', 'Collaboration and export history'],
      featured: false,
      plan: 'business'
    }
  ];

  return (
    <div className="section-shell py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Pricing</div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">Simple pricing for growing businesses.</h1>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className={`card-shell p-8 ${plan.featured ? 'border-brand-200 bg-brand-50 shadow-lg' : ''}`}>
            {plan.featured && <div className="mb-4 inline-flex rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">Most popular</div>}
            <div className="text-xl font-bold text-slate-900">{plan.name}</div>
            <div className="mt-5 flex items-end gap-2">
              <span className="text-4xl font-black text-slate-900">{plan.price}</span>
              {plan.period && <span className="pb-2 text-slate-500">{plan.period}</span>}
            </div>
            <p className="mt-3 text-sm text-slate-600">{plan.description}</p>

            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.plan === 'free' ? (
              <a href="/signup" className="mt-8 block text-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900">
                Get Started
              </a>
            ) : (
              <form action="/api/stripe/checkout" method="POST">
                <input type="hidden" name="plan" value={plan.plan} />
                <button type="submit" className={`mt-8 block w-full rounded-xl px-4 py-3 text-sm font-semibold ${plan.featured ? 'bg-brand-600 text-white' : 'border border-slate-300 bg-white text-slate-900'}`}>
                  {session ? 'Upgrade' : 'Choose Plan'}
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      {usage && (
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Current usage</div>
          <div className="mt-4 text-xl font-bold text-slate-900">{currentPlan.toUpperCase()} plan</div>
          <div className="mt-2 text-sm text-slate-600">Today: {usage.dailyCount}/{usage.dailyLimit} • This month: {usage.monthlyCount}/{usage.monthlyLimit}</div>
        </div>
      )}
    </div>
  );
}
