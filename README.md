# Auth Hub

<img width="1435" height="802" alt="Auth Hub login" src="https://github.com/user-attachments/assets/3702d850-8a0d-4f0c-80d1-acbc5217d0f4" />

Authentication hub built with Next.js — credentials, OAuth, passkeys, and password recovery.

[Live demo](https://auth-hub.vercel.app)

## Features

- **Credentials login** — email/password with bcrypt hashing
- **Sign up** — create accounts with validated forms (Zod + React Hook Form)
- **Google & GitHub OAuth** — social sign-in with account linking by email
- **Passkeys (WebAuthn)** — register and sign in without a password
- **Password recovery** — forgot/reset flow via Gmail SMTP (Nodemailer)
- **Protected home** — session-aware UI with sign-out and passkey setup prompts
- **Prisma + Supabase Postgres** — Auth.js adapter with migrations and seed user

## Technologies

| Technology | Purpose |
| --- | --- |
| **Next.js 16** | App Router framework |
| **React 19** | UI |
| **TypeScript** | Static typing |
| **Auth.js (NextAuth v5)** | Auth (JWT, Credentials, Google, GitHub, Passkey) |
| **Prisma** | ORM + Auth.js adapter |
| **Supabase** | Postgres database |
| **Chakra UI v3** | Design system |
| **Emotion** | CSS-in-JS |
| **React Hook Form + Zod** | Forms and validation |
| **SimpleWebAuthn** | Passkeys / WebAuthn |
| **bcryptjs** | Password hashing |
| **Nodemailer** | Password-reset emails |
| **pnpm** | Package manager |
| **ESLint + Prettier** | Linting and formatting |
| **React Compiler** | Render optimization |

## Getting started

```bash
cp .env.example .env
pnpm install
pnpm prisma:migrate
pnpm dev
```

Fill in `.env` before starting (see below). The app runs at [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` and set:

| Variable | Description |
| --- | --- |
| `AUTH_URL` | App URL (`http://localhost:3000` locally) |
| `AUTH_SECRET` | Auth.js secret |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth (optional) |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | GitHub OAuth (optional) |
| `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_FROM` | Gmail SMTP for password reset |
| `DATABASE_URL` | Supabase pooler URL (runtime, port 6543) |
| `DIRECT_URL` | Supabase URL for Prisma migrations (port 5432) |

Do not commit your real `.env`.

## Authentication

| Method | Notes |
| --- | --- |
| **Credentials** | Seeded user: `admin@test.com` / `123456` |
| **Google** | Requires Google OAuth env vars |
| **GitHub** | Requires GitHub OAuth env vars |
| **Passkey** | Register after login or from `/auth/setup-passkey` |
| **Forgot password** | Sends a reset link (expires in 1 hour) |

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Chakra typegen + Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint |
| `pnpm typegen` | Generate Chakra theme types |
| `pnpm prisma:generate` | Generate Prisma Client |
| `pnpm prisma:migrate` | Run migrations |
| `pnpm prisma:studio` | Open Prisma Studio |
