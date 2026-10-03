import { NextResponse } from 'next/server';

const toolTemplates: Record<string, string> = {
  'AI Email Writer': 'Write a clear and persuasive email for a business audience. Keep the tone professional, useful, and concise. Focus on the business goal and include a strong call to action.\n\nUser request:\n',
  'Invoice Generator': 'Create a polished invoice for a small business client. Include a business name, invoice number, services rendered, subtotal, tax, total, payment terms, and a professional thank-you note.\n\nUser request:\n',
  'Business Plan Generator': 'Create a concise, professional business plan for a small business idea. Include overview, market opportunity, services, pricing, operations, marketing strategy, and financial outlook.\n\nUser request:\n',
  'Marketing Copy Generator': 'Write persuasive marketing copy for a small business. Keep it clear, compelling, and conversion-focused. Include headline, copy, and CTA suggestions.\n\nUser request:\n',
  'Social Media Post Generator': 'Write a social media post for a business brand. Keep the message engaging, brand-safe, and easy to share. Include a headline, copy, and a call to action.\n\nUser request:\n',
  'Business Proposal Generator': 'Create a business proposal for a client. Include a problem statement, proposed solution, scope of work, pricing, timeline, outcomes, and a closing statement.\n\nUser request:\n',
  'Customer Review Reply Generator': 'Draft a professional and warm customer review response. Keep it appreciative, human, and brand-appropriate. Mention gratitude and reinforcement of service quality.\n\nUser request:\n',
  'YouTube/Video Script Generator': 'Write a clear and engaging YouTube or video script. Include hook, main points, examples, and a CTA. Keep it natural, audience-friendly, and suited for an online business or service topic.\n\nUser request:\n'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tool = String(body.tool || 'AI Email Writer');
    const prompt = String(body.prompt || '').trim();

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt content.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const template = toolTemplates[tool] || 'Create a realistic business document for the following request.\n\nUser request:\n';
      const fallbackText = [
        'AI API is not configured in this environment yet.',
        '',
        'To enable live generation, add OPENAI_API_KEY to your environment variables.',
        '',
        'Draft preview for ' + tool + ':',
        '',
        template + prompt,
        '',
        'This preview is intentionally transparent and does not claim to be a live AI-generated result without the proper API connection.'
      ].join('\n');

      return NextResponse.json({ output: fallbackText, source: 'local-fallback' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful business writing assistant for BizAI Tools. Write concise, polished, practical, professional content for small business owners and agencies.'
          },
          {
            role: 'user',
            content: `${toolTemplates[tool] || 'Create a polished business document for the following request.\n\n'}${prompt}`
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: `AI API request failed: ${error}` }, { status: 500 });
    }

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content || 'No content returned by the AI API.';

    return NextResponse.json({ output, source: 'openai' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unexpected server error' }, { status: 500 });
  }
}
