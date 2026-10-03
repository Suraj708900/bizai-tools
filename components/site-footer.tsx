import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="mb-4 text-xl font-bold text-white">BizAI Tools</div>
          <p className="max-w-sm text-sm text-slate-400">
            Professional AI business tools for proposals, documents, marketing, and growth operations.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Explore</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div><Link href="/tools">AI Tools</Link></div>
            <div><Link href="/pricing">Pricing</Link></div>
            <div><Link href="/dashboard">Dashboard</Link></div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Company</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div><Link href="/contact">Contact</Link></div>
            <div><Link href="/privacy">Privacy Policy</Link></div>
            <div><Link href="/terms">Terms of Service</Link></div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        © 2026 BizAI Tools. All rights reserved.
      </div>
    </footer>
  );
}
