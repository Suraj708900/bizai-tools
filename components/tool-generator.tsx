'use client';

import { useMemo, useState } from 'react';
import { Copy, Download, Save, Sparkles, Wand2 } from 'lucide-react';

const toolOptions = [
  'AI Email Writer',
  'Invoice Generator',
  'Business Plan Generator',
  'Marketing Copy Generator',
  'Social Media Post Generator',
  'Business Proposal Generator',
  'Customer Review Reply Generator',
  'YouTube/Video Script Generator'
];

const defaultPromptMap: Record<string, string> = {
  'AI Email Writer': 'Write a professional follow-up email to a potential client about a new website design package.',
  'Invoice Generator': 'Create an invoice for a web design project with services, taxes, and payment terms for a small business client.',
  'Business Plan Generator': 'Create a concise business plan for a local home cleaning service in the United States.',
  'Marketing Copy Generator': 'Write a landing page headline and CTA for a bookkeeping service targeting small businesses.',
  'Social Media Post Generator': 'Generate a polished social media post for a landscaping business promoting seasonal packages.',
  'Business Proposal Generator': 'Create a business proposal for a digital marketing engagement for a dental clinic.',
  'Customer Review Reply Generator': 'Write a warm, professional response to a customer review praising our installation team and fast service.',
  'YouTube/Video Script Generator': 'Create a 90-second YouTube script outline for a beginner-friendly video about starting an online business.'
};

export function AIToolGenerator() {
  const [selectedTool, setSelectedTool] = useState(toolOptions[0]);
  const [prompt, setPrompt] = useState(defaultPromptMap[toolOptions[0]]);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const readyToGenerate = useMemo(() => prompt.trim().length > 10, [prompt]);

  const handleToolChange = (tool: string) => {
    setSelectedTool(tool);
    setPrompt(defaultPromptMap[tool] || '');
    setResult('');
    setStatus('');
  };

  const handleGenerate = async () => {
    if (!readyToGenerate) {
      setStatus('Please add more detail before generating.');
      return;
    }

    setIsLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: selectedTool, prompt })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to generate content.');
      }

      setResult(data.output || '');
      setStatus(data.source === 'openai' ? 'AI output ready.' : 'Live API not configured. This preview uses a safe fallback message.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setStatus('Content copied to clipboard.');
  };

  const handleDownload = () => {
    if (!result) return;

    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedTool.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus('File downloaded successfully.');
  };

  const handleSave = () => {
    if (!result) {
      setStatus('Generate content before saving.');
      return;
    }

    if (!isLoggedIn) {
      setStatus('Please sign in to save this document.');
      return;
    }

    setStatus('Document saved to your dashboard.');
  };

  return (
    <div className="card-shell overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-slate-200 bg-slate-50 p-5 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            <Wand2 size={14} />
            Tools
          </div>
          <div className="space-y-2">
            {toolOptions.map((tool) => (
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
            <button onClick={handleGenerate} disabled={isLoading} className="primary-btn disabled:cursor-not-allowed disabled:bg-brand-300">
              {isLoading ? 'Generating...' : 'Generate'}
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
