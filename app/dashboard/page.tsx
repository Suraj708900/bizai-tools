import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getUsageStats } from '@/lib/usage';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscriptions: true }
  });

  if (!user) {
    redirect('/login');
  }

  const activeSubscription = user.subscriptions.find((sub) => sub.status === 'active');
  const currentPlan = activeSubscription?.plan || user.plan || 'free';
  const usage = await getUsageStats(user.id, currentPlan);

  const [savedDocs, recentProjects, downloadHistory, recentGenerations] = await Promise.all([
    prisma.savedDocument.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      take: 5
    }),
    prisma.downloadLog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.generation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ]);

  return (
    <div className="section-shell py-16 md:py-20">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Dashboard</div>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Welcome back, {user.name || 'there'}.</h1>
        </div>
        <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
          Current plan: {currentPlan}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          ['Available AI generations', `${Math.max(usage.remainingToday, 0)} left today`],
          ['Saved documents', `${savedDocs.length} files`],
          ['Recent projects', `${recentProjects.length} active`],
          ['Download history', `${downloadHistory.length} files`]
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
            {recentProjects.length > 0 ? recentProjects.map((item) => (
              <li key={item.id} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {item.name}
              </li>
            )) : <li className="text-slate-500">No projects yet.</li>}
          </ul>
        </div>

        <div className="card-shell p-6">
          <h2 className="mb-5 text-xl font-bold text-slate-900">Saved documents</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            {savedDocs.length > 0 ? savedDocs.map((item) => (
              <li key={item.id} className="rounded-xl border border-slate-200 p-3">
                {item.title}
              </li>
            )) : <li className="text-slate-500">No saved documents yet.</li>}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-shell p-6">
          <h2 className="mb-5 text-xl font-bold text-slate-900">Recent AI generations</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            {recentGenerations.length > 0 ? recentGenerations.map((item) => (
              <li key={item.id} className="rounded-xl border border-slate-200 p-3">
                {item.tool}
              </li>
            )) : <li className="text-slate-500">No generations yet.</li>}
          </ul>
        </div>

        <div className="card-shell p-6">
          <h2 className="mb-5 text-xl font-bold text-slate-900">Download history</h2>
          <div className="space-y-3 text-sm text-slate-700">
            {downloadHistory.length > 0 ? downloadHistory.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                {item.fileName}
              </div>
            )) : <div className="text-slate-500">No downloads yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
