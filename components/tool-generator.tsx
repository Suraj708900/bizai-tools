'use client';

import { useState } from 'react';
import { Check, Copy, Download, Save, Sparkles } from 'lucide-react';

const tools = [
  'AI Email Writer',
  'Invoice Generator',
  'Business Plan Generator',
  'Marketing Copy Generator',
  'Social Media Post Generator',
  'Business Proposal Generator',
  'Customer Review Reply Generator',
  'YouTube/Video Script Generator'
];

const defaultPrompts: Record<string, string> = {
  'AI Email Writer': 'Write a professional follow-up email to a potential client about a new business website package.',
  'Invoice Generator': 'Create a clean invoice for a small business web design project with dates, services, tax, and payment terms.',
  'Business Plan Generator': 'Write a concise business plan for a local cleaning service targeting homeowners in the United States.',
  'Marketing Copy Generator': 'Write a landing page headline and call to action for a bookkeeping service for small businesses.',
  'Social Media Post Generator': 'Create a social media post for a landscaping business promoting seasonal packages.',
  'Business Proposal Generator': 'Create a business proposal for a digital marketing campaign for a local clinic.',
  'Customer Review Reply Generator': 'Write a warm response to a customer review praising our team and fast service.',
  'YouTube/Video Script Generator': 'Create a short YouTube script on how to start an online business for beginners.'
};

export function AIToolGenerator({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [prompt, setPrompt] = useState(defaultPrompts[tools[0]]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleToolChange = (tool: string) => {
    setSelectedTool(tool);
    setPrompt(defaultPrompts[tool] || '');
    setResult('');
    setStatus('');
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setStatus('Please add a clear prompt before generating.');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: selectedTool, prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Generation failed.');
      }

      setResult(data.output || '');
      setStatus(data.source === 'openai' ? 'AI output generated successfully.' : 'AI output ready.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to generate content.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setStatus('Content copied to clipboard.');
  };

  const handleDownload = async () => {
    if (!result) return;

    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedTool.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    if (isLoggedIn) {
      try {
        await fetch('/api/downloads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: link.download, tool: selectedTool })
        });
      } catch {
        // ignore if log fails
      }
    }

    setStatus('File downloaded successfully.');
  };

  const handleSave = async () => {
    if (!result) {
      setStatus('Generate content first, then save it.');
      return;
    }

    if (!isLoggedIn) {
      setStatus('Please sign in to save this document.');
      return;
    }

    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${selectedTool} document`,
          content: result,
          tool: selectedTool
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Unable to save document.');
      }

      setStatus('Document saved to your dashboard.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to save document.');
    }
  };

  return (
    <div className="card-shell overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-slate-200 bg-slate-50 p-5 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            <Sparkles size={14} />
            Tools
          </div>
          <div className="space-y-2">
            {tools.map((tool) => (
              <button
                key={tool}
                onClick={() => handleToolChange(tool)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  selectedTool === tool
                    ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </aside>

        <div className="p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">AI Builder</div>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">{selectedTool}</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <Sparkles size={12} />
              {isLoggedIn ? 'Logged in' : 'Guest'}
            </div>
          </div>

          <label className="mb-2 block text-sm font-medium text-slate-700">Input</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={7}
            className="input-style resize-none"
            placeholder="Describe what you want to create..."
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={handleGenerate} disabled={loading} className="primary-btn disabled:cursor-not-allowed disabled:bg-brand-300">
              {loading ? 'Generating...' : 'Generate'}
            </button>
            <button onClick={handleCopy} disabled={!result} className="secondary-btn disabled:cursor-not-allowed disabled:text-slate-400">
              <Copy size={16} className="mr-2" />
              Copy
            </button>
            <button onClick={handleDownload} disabled={!result} className="secondary-btn disabled:cursor-not-allowed disabled:text-slate-400">
              <Download size={16} className="mr-2" />
              Download
            </button>
            <button onClick={handleSave} className="secondary-btn">
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>

          {status && <p className="mt-4 text-sm text-slate-600">{status}</p>}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Generated result</h4>
            <div className="min-h-48 whitespace-pre-line text-sm leading-7 text-slate-700">
              {result || 'Your generated content will appear here.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
