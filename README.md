# Auth Hub

<img width="1424" height="791" alt="Screenshot 2026-09-03 at 20 41 44" src="https://github.com/user-attachments/assets/da72f429-ce41-45bb-982b-7d2b90c49b28" />




Authentication app built with Next.js. Includes credentials login and social providers (Google and GitHub).

**Site:** [https://auth-hub.vercel.app](https://auth-hub.vercel.app)

**Local:** [http://localhost:3000](http://localhost:3000)

## Technologies

| Technology | Purpose |
| --- | --- |
| **Next.js 16** | React framework (App Router) |
| **React 19** | UI and components |
| **TypeScript** | Static typing |
| **Auth.js (NextAuth v5)** | Authentication with JWT, Credentials, Google, and GitHub |
| **Chakra UI v3** | Design system and components |
| **Emotion** | Styling (cache + React) |
| **React Hook Form** | Controlled forms |
| **Zod** | Schema validation |
| **@hookform/resolvers** | Zod + React Hook Form integration |
| **SimpleWebAuthn** | WebAuthn / passkeys support |
| **pnpm** | Package manager |
| **ESLint + Prettier** | Linting and formatting |
| **React Compiler** | Render optimization |

## Getting started

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and fill in any missing values (especially `AUTH_SECRET` and OAuth credentials if you want Google/GitHub login).

The app is available at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Generates Chakra types and starts the development server |
| `pnpm build` | Production build |
| `pnpm start` | Serves the production build |
| `pnpm lint` | Runs ESLint |
| `pnpm typegen` | Generates Chakra theme types |

## Authentication

- **Credentials** (demo defaults from `.env.example`):
  - Email: `admin@test.com`
  - Password: `123456`
- **Google OAuth** — set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in `.env`
- **GitHub OAuth** — set `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` in `.env`

See `.env.example` for the full list of variables. Do not commit your real `.env`.
