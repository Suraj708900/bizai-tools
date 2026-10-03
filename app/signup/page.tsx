'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Account creation failed.');
      setLoading(false);
      return;
    }

    const signInResult = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    setLoading(false);

    if (signInResult?.error) {
      setError(signInResult.error || 'Unable to sign in after signup.');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="section-shell py-16 md:py-20">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="mb-6 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Start free</div>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Create your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input type="text" className="input-style" placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" className="input-style" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" className="input-style" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button type="submit" disabled={loading} className="primary-btn w-full disabled:cursor-not-allowed disabled:bg-brand-300">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link href="/login" className="font-semibold text-brand-600">Login</Link>
        </div>
      </div>
    </div>
  );
}
