import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="section-shell py-16 md:py-20">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="mb-6 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Start free</div>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Create your account</h1>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input type="text" className="input-style" placeholder="Jane Smith" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" className="input-style" placeholder="you@company.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" className="input-style" placeholder="Create a strong password" />
          </div>
          <button type="submit" className="primary-btn w-full">Create Account</button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link href="/login" className="font-semibold text-brand-600">Login</Link>
        </div>
      </div>
    </div>
  );
}
