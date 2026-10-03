# BizAI Tools

A professional SaaS web application for small businesses to generate emails, invoices, proposals, plans, marketing content, and more using AI.

## Features
- Responsive SaaS homepage and landing flow
- AI tool workspace with 8 generator types
- Pricing, login, sign up, dashboard, contact, privacy, and terms pages
- Real OpenAI-compatible API integration when `OPENAI_API_KEY` is configured
- Fallback-safe behavior when no API key is available

## Getting started

```bash
npm install
npm run dev
```

## Environment variables

Add a `.env.local` file with:

```bash
OPENAI_API_KEY=your-key-here
OPENAI_MODEL=gpt-4o-mini
```

## Production note

The project is set up as a Next.js app and can be deployed to Vercel or any Node-compatible hosting environment.
