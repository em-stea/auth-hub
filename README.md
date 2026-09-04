# Auth Hub

<img width="1435" height="802" alt="Auth Hub login" src="https://github.com/user-attachments/assets/3702d850-8a0d-4f0c-80d1-acbc5217d0f4" />

Authentication hub built with Next.js — credentials, OAuth, passkeys, and password recovery.

<a href="https://auth-nm702qmf8-testing-team13.vercel.app/auth/login" target="_blank" rel="noopener noreferrer">Live demo</a>

## Features

- **Credentials login** — email/password with bcrypt hashing
- **Sign up** — create accounts with validated forms (Zod + React Hook Form)
- **Google & GitHub OAuth** — social sign-in with account linking by email
- **Passkeys (WebAuthn)** — register and sign in without a password
- **Password recovery** — forgot/reset flow via Gmail SMTP (Nodemailer)
- **Protected home** — session-aware UI with sign-out and passkey setup prompts
- **Prisma + Supabase Postgres** — Auth.js adapter with migrations and seed user

## Technologies

| Technology                | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| **Next.js 16**            | App Router framework                             |
| **React 19**              | UI                                               |
| **TypeScript**            | Static typing                                    |
| **Auth.js (NextAuth v5)** | Auth (JWT, Credentials, Google, GitHub, Passkey) |
| **Prisma**                | ORM + Auth.js adapter                            |
| **Supabase**              | Postgres database                                |
| **Chakra UI v3**          | Design system                                    |
| **Emotion**               | CSS-in-JS                                        |
| **React Hook Form + Zod** | Forms and validation                             |
| **SimpleWebAuthn**        | Passkeys / WebAuthn                              |
| **bcryptjs**              | Password hashing                                 |
| **Nodemailer**            | Password-reset emails                            |
| **pnpm**                  | Package manager                                  |
| **ESLint + Prettier**     | Linting and formatting                           |
| **React Compiler**        | Render optimization                              |

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

| Variable                                    | Description                                    |
| ------------------------------------------- | ---------------------------------------------- |
| `AUTH_URL`                                  | App URL (`http://localhost:3000` locally)      |
| `AUTH_SECRET`                               | Auth.js secret                                 |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`     | Google OAuth (optional)                        |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`     | GitHub OAuth (optional)                        |
| `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_FROM` | Gmail SMTP for password reset                  |
| `DATABASE_URL`                              | Supabase pooler URL (runtime, port 6543)       |
| `DIRECT_URL`                                | Supabase URL for Prisma migrations (port 5432) |

Do not commit your real `.env`.

### Gmail SMTP (App Password)

Gmail does not allow your normal account password for SMTP. Create an [App Password](https://myaccount.google.com/apppasswords) instead:

1. Open [Google Account → Security](https://myaccount.google.com/security).
2. Turn on **2-Step Verification** (required before App Passwords appear).
3. Go to [App passwords](https://myaccount.google.com/apppasswords) (or search “App passwords” in your Google Account).
4. Create a password — app: **Mail**, device: **Other** (e.g. `Auth Hub`).
5. Copy the 16-character password and set it in `.env`:

```env
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
SMTP_FROM="Auth Hub <your-email@gmail.com>"
```

Spaces in the App Password are fine; Nodemailer accepts them as-is.

## Authentication

| Method              | Notes                                              |
| ------------------- | -------------------------------------------------- |
| **Credentials**     | Seeded user: `admin@test.com` / `123456`           |
| **Google**          | Requires Google OAuth env vars                     |
| **GitHub**          | Requires GitHub OAuth env vars                     |
| **Passkey**         | Register after login or from `/auth/setup-passkey` |
| **Forgot password** | Sends a reset link (expires in 1 hour)             |

## Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `pnpm dev`             | Chakra typegen + Next.js dev server |
| `pnpm build`           | Production build                    |
| `pnpm start`           | Serve production build              |
| `pnpm lint`            | ESLint                              |
| `pnpm typegen`         | Generate Chakra theme types         |
| `pnpm prisma:generate` | Generate Prisma Client              |
| `pnpm prisma:migrate`  | Run migrations                      |
| `pnpm prisma:studio`   | Open Prisma Studio                  |
