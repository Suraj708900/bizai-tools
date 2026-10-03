import Link from 'next/link';

const pricing = [
  {
    name: 'Free',
    price: '$0',
    description: '5 generations per day',
    features: ['5 generations per day', 'Essential business templates', 'Basic export options'],
    featured: false,
    href: '/signup'
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: '100 generations per month',
    features: ['100 generations/month', 'All business tools', 'Priority generation speed'],
    featured: true,
    href: '/signup'
  },
  {
    name: 'Business',
    price: '$29',
    period: '/month',
    description: '500 generations per month',
    features: ['500 generations/month', 'Collaboration-ready workspace', 'Advanced exports and history'],
    featured: false,
    href: '/signup'
  }
];

export default function PricingPage() {
  return (
    <div className="section-shell py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Pricing</div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">Simple pricing for growing businesses.</h1>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricing.map((plan) => (
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

            <Link href={plan.href} className={`mt-8 block text-center rounded-xl px-4 py-3 text-sm font-semibold ${plan.featured ? 'bg-brand-600 text-white' : 'border border-slate-300 bg-white text-slate-900'}`}>
              {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
