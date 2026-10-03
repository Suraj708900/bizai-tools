import React from 'react';
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import { Menu, Sparkles } from 'lucide-react';

export function SiteHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-500/20">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-slate-900">BizAI Tools</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {['Home', 'AI Tools', 'Pricing', 'Dashboard', 'Contact'].map((label, index) => {
            const hrefs = ['/', '/tools', '/pricing', '/dashboard', '/contact'];
            const href = hrefs[index];
            return (
              <Link key={href} href={href} className="text-sm font-medium text-slate-600 transition hover:text-brand-600">
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {status === 'authenticated' ? (
            <>
              <Link href="/dashboard" className="secondary-btn px-4 py-2.5">Dashboard</Link>
              <button onClick={() => signOut()} className="primary-btn px-4 py-2.5">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="secondary-btn px-4 py-2.5">Login</Link>
              <Link href="/signup" className="primary-btn px-4 py-2.5">Sign Up</Link>
            </>
          )}
        </div>

        <button className="rounded-xl border border-slate-200 p-2 md:hidden" aria-label="Menu">
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
