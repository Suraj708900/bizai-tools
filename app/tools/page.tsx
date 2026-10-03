import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { AIToolGenerator } from '@/components/tool-generator';

export default function ToolsPage() {
  return (
    <div className="section-shell py-16 md:py-20">
      <div className="mb-10 max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          <Sparkles size={12} />
          AI workspace
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">AI Tools</h1>
        <p className="mt-4 text-lg text-slate-600">
          Unlock templates, copywriting, proposals, client communication, and business planning in one modern workspace.
        </p>
      </div>

      <AIToolGenerator />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          ['Professional outputs', 'Generate polished content aligned with your business tone and goals.'],
          ['Built for action', 'Move from idea to proposal, email, or document in a few clicks.'],
          ['Works across industries', 'Perfect for agencies, freelancers, local services, and online sellers.']
        ].map(([title, text]) => (
          <div key={title} className="card-shell p-6">
            <div className="mb-3 inline-flex rounded-full bg-brand-50 p-2 text-brand-600"><Check size={18} /></div>
            <div className="mb-2 text-xl font-semibold text-slate-900">{title}</div>
            <p className="text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-slate-950 p-8 text-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-brand-300">Ready to scale?</div>
            <div className="mt-2 text-3xl font-bold">Start with a free plan today.</div>
          </div>
          <Link href="/signup" className="primary-btn inline-flex items-center gap-2">
            Start Free <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
