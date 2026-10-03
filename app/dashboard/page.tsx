import Link from 'next/link';

const recentProjects = [
  'Website proposal draft',
  'Client follow-up email',
  'Marketing landing page headline',
  'Business plan summary'
];

const savedDocs = [
  'Spring email campaign',
  'Small business pricing proposal',
  'Customer review response playbook'
];

const downloadHistory = [
  'Invoice_2026_10_03.txt',
  'Proposal_2026_10_02.txt',
  'Marketing_copy_2026_10_01.txt'
];

export default function DashboardPage() {
  return (
    <div className="section-shell py-16 md:py-20">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Dashboard</div>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Welcome back, Alex.</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          ['Available AI generations', '38 left today'],
          ['Saved documents', '12 files'],
          ['Recent projects', '4 active'],
          ['Download history', '29 files']
        ].map(([label, value]) => (
          <div key={label} className="card-shell p-5">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-3 text-2xl font-bold text-slate-900">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-shell p-6">
          <h2 className="mb-5 text-xl font-bold text-slate-900">Recent projects</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            {recentProjects.map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-shell p-6">
          <h2 className="mb-5 text-xl font-bold text-slate-900">Saved documents</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            {savedDocs.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 p-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 card-shell p-6">
        <h2 className="mb-5 text-xl font-bold text-slate-900">Download history</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {downloadHistory.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-right">
        <Link href="/tools" className="primary-btn">Open AI Tools</Link>
      </div>
    </div>
  );
}
