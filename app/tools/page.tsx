import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AIToolGenerator } from '@/components/tool-generator';

export default async function ToolsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="section-shell py-16 md:py-20">
      <div className="mb-10 max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          <span className="text-brand-700">✦</span>
          AI workspace
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">AI Tools</h1>
        <p className="mt-4 text-lg text-slate-600">
          Create business documents, marketing content, proposals, plans, and client responses in seconds.
        </p>
      </div>

      <AIToolGenerator isLoggedIn={Boolean(session?.user?.id)} />
    </div>
  );
}
