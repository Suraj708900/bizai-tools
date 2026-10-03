# BizAI Tools

A production-ready SaaS web application for AI-powered business operations.

## Features
- SaaS marketing website and responsive design
- AI content generation tools for 8 business use cases
- Secure credential-based authentication
- Prisma-backed user and usage database
- Free, Pro, and Business plan logic with daily and monthly limits
- Stripe checkout and webhook-ready subscription support
- Real AI API integration using OpenAI-compatible APIs only
- Dashboard with usage, saved documents, downloads, and project tracking

## Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL-ready schema
- NextAuth.js
- Stripe
- OpenAI-compatible API

## Local setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Create a PostgreSQL database and add a `.env.local` file.

3. Generate Prisma client
   ```bash
   npx prisma generate
   ```

4. Run migrations
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the app
   ```bash
   npm run dev
   ```

## Required environment variables

```bash
DATABASE_URL=postgresql://user:password@host:5432/bizai_tools
NEXTAUTH_SECRET=your-long-random-secret
AUTH_SECRET=your-long-random-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
OPENAI_API_KEY=your-openai-key
OPENAI_MODEL=gpt-4o-mini
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
STRIPE_PRO_PRICE_ID=price_xxx
STRIPE_BUSINESS_PRICE_ID=price_yyy
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

## Hostinger deployment guidance

For Hostinger, the recommended production hosting is a Node.js-capable VPS or Cloud plan.

Minimum practical setup:
- Hostinger VPS or Cloud plan with Node.js support
- 2 vCPU / 4GB RAM recommended
- PostgreSQL database or managed external database
- Nginx reverse proxy recommended
- PM2 for process management

### Recommended deployment pattern
1. Deploy the app to a Linux VPS
2. Install Node.js 18+ and npm
3. Install PostgreSQL or connect to an external managed DB
4. Set all environment variables above in the server environment
5. Run production build:
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate deploy
   npm run build
   npm run start
   ```
6. Use PM2 to keep the app alive:
   ```bash
   pm2 start npm --name bizai-tools -- start
   ```
7. Configure Nginx reverse proxy to port 3000
8. Configure Stripe webhooks to point at your public HTTPS endpoint

### Important Hostinger notes
- Shared hosting is usually not suitable for a full Next.js app with Stripe webhooks and a database.
- A VPS or Node-enabled host is strongly recommended.
- If your Hostinger plan does not provide Node.js runtime or PostgreSQL, use an external compatible database or VPS environment.

## Plan logic
- Free: 5 generations per day
- Pro: $9/month, 100 generations/month
- Business: $29/month, 500 generations/month

## AI behavior
- Real OpenAI-compatible API generation is required.
- If OPENAI_API_KEY is missing, generation is blocked and an explicit error is returned.
- No fake AI output is generated.

## Business notes
- All sensitive keys and Stripe secrets are stored server-side.
- Users must be signed in before generation, saving, or download tracking is enabled.
- Stripe checkout and webhook routes should only be used with valid HTTPS public URLs.
