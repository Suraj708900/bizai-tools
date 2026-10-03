import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="section-shell py-16 md:py-20">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="mb-6 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Welcome back</div>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Login</h1>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" className="input-style" placeholder="you@company.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" className="input-style" placeholder="••••••••" />
          </div>
          <button type="submit" className="primary-btn w-full">Log In</button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Don’t have an account? <Link href="/signup" className="font-semibold text-brand-600">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
