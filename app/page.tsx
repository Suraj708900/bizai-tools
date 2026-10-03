import Link from 'next/link';
import { CheckCircle2, Sparkles } from 'lucide-react';

const tools = [
  'AI Email Writer',
  'Invoice Generator',
  'Business Plan Generator',
  'Marketing Copy Generator',
  'Social Media Post Generator',
  'Business Proposal Generator',
  'Customer Review Reply Generator',
  'YouTube/Video Script Generator'
];

export default function HomePage() {
  return (
    <>
      <section className="section-shell py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              <Sparkles size={12} />
              AI for small business growth
            </div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Run Your Business <span className="gradient-text">Smarter With AI</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Create business documents, marketing content, emails, proposals and more in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="primary-btn">Try Free</Link>
              <Link href="/tools" className="secondary-btn">Explore AI Tools</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
              <div><span className="font-bold text-slate-900">5k+</span> businesses powered</div>
              <div><span className="font-bold text-slate-900">30+</span> templates</div>
              <div><span className="font-bold text-slate-900">4.9/5</span> average rating</div>
            </div>
          </div>

          <div className="card-shell p-5">
            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Smart Workspace</div>
                <div className="rounded-full bg-brand-500/20 px-2 py-1 text-xs text-brand-200">Live</div>
              </div>

              <div className="space-y-4 text-sm text-slate-200">
                <div className="rounded-xl bg-slate-900 p-4">
                  <div className="font-medium text-white">AI Email Writer</div>
                  <div className="mt-2 text-slate-300">Subject: Follow-up on website proposal</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                  <div className="font-medium text-white">Marketing Copy</div>
                  <div className="mt-2 text-slate-300">Headline: Grow faster with smarter systems.</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                  <div className="font-medium text-white">Proposal Draft</div>
                  <div className="mt-2 text-slate-300">Ready to send, simplified for your client.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="section-shell">
          <div className="mb-10 max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">Why BizAI Tools</div>
            <h2 className="mt-3 text-3xl font-bold">Built for owners who want more time and better results.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              ['Professional outputs', 'Generate polished business content without wasting hours writing from scratch.'],
              ['Faster decisions', 'Turn rough ideas into clear documents, proposals, and campaigns in minutes.'],
              ['Affordable growth', 'Scale from 5 free generations a day to a full business plan with premium access.']
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                <CheckCircle2 className="mb-4 text-brand-400" size={28} />
                <div className="mb-2 text-xl font-semibold text-white">{title}</div>
                <p className="text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-10 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">AI Tools</div>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Everything your business needs in one place.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <div key={tool} className="card-shell p-5">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">AI tool</div>
              <div className="mb-4 text-lg font-bold text-slate-900">{tool}</div>
              <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                Use tool
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
