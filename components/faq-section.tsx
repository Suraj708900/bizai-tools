import Link from 'next/link';
import { CheckCircle2, Sparkles } from 'lucide-react';

const faqItems = [
  {
    question: 'Does BizAI Tools use real AI?',
    answer: 'Yes. It connects to an OpenAI-compatible API when OPENAI_API_KEY is configured. No fake AI output is generated.'
  },
  {
    question: 'What is the free plan?',
    answer: 'The free plan includes 5 generations per day. If you need more output, upgrade to Pro or Business.'
  },
  {
    question: 'Can I save my generated content?',
    answer: 'Yes. Logged-in users can save generated work to their dashboard and download their documents.'
  },
  {
    question: 'Is this suitable for Hostinger?',
    answer: 'Yes. The app is built to be portable and can be deployed on Hostinger VPS / Node-enabled hosting with PostgreSQL.'
  }
];

export function FAQSection() {
  return (
    <section className="section-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          <Sparkles size={12} />
          FAQ
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">Questions from growing businesses</h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {faqItems.map((item) => (
          <div key={item.question} className="card-shell p-6">
            <div className="mb-3 flex items-center gap-2 text-brand-600"><CheckCircle2 size={18} /></div>
            <div className="mb-3 text-xl font-semibold text-slate-900">{item.question}</div>
            <p className="text-slate-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
