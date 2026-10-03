import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="section-shell py-16 md:py-20">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="mb-6 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Contact</div>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Let’s talk about your business.</h1>
        </div>

        <form className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
            <input type="text" className="input-style" placeholder="Your name" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" className="input-style" placeholder="you@company.com" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
            <input type="text" className="input-style" placeholder="How can we help?" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
            <textarea rows={6} className="input-style resize-none" placeholder="Tell us what you're building..." />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="primary-btn w-full">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
}
