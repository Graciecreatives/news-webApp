# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Environment & serverless API (Vercel)

To run the app locally and to use the serverless `/api/news` function on Vercel, follow these steps:

1. Create a `.env` file (or use the provided `.env.example`) in the project root with the following entries:

```
VITE_NEWS_API_KEY=your_newsapi_key_here    # used for client-side fallback in dev
NEWS_API_KEY=your_newsapi_key_here        # used by serverless functions on Vercel
```

2. Local development options:
- To run the frontend only (Vite dev server) and use client-side fallback, set `VITE_NEWS_API_KEY` and run:

```powershell
# News Web App

A small React + Vite news application with a serverless API wrapper that fetches headlines from NewsAPI.org. This repository includes a local dev API proxy and mock data so you can develop the UI without exposing your API key.

**This README** explains: setup, local development, serverless API usage, Vercel deployment, and troubleshooting.

**Tech stack**
- **Frontend:** React, Vite, Tailwind CSS
- **HTTP client:** `axios`
- **Serverless function:** `api/news.js` (designed for Vercel)

**Important files**
- **`src/`**: React source code. Main page is `src/pages/NewsFeed.jsx`.
- **`api/news.js`**: Serverless function (Vercel) that proxies requests to NewsAPI.
- **`dev-server.js`**: Local dev API server used during development; serves `api/mock-news.json` if no key is present.
- **`api/mock-news.json`**: Mock response for UI development.
- **`vite.config.js`**: Configured to proxy `/api` to the local dev API (port 3001).

**Quick start**

- Install dependencies:

```powershell
npm install
```

- Node: use Node 18+ for the local dev server (`dev-server.js` uses global `fetch`).

**Environment variables**

- Create a `.env` file in the project root (do not commit). Use `.env.example` as a template. Example:

```
VITE_NEWS_API_KEY=your_newsapi_key_here    # client fallback for UI dev (not for production)
NEWS_API_KEY=your_newsapi_key_here        # server-side key for serverless functions
```

- `NEWS_API_KEY` is used by `api/news.js` in production (Vercel). `VITE_NEWS_API_KEY` is only a local/client fallback and will be exposed to the browser — avoid using it in production.

**Run locally (recommended)**

You can run the frontend and a local API server concurrently.

Option A — start both with one command:

```powershell
# optionally set the key for this session
$env:NEWS_API_KEY = "your_newsapi_key_here"

npm run dev:all
```

Option B — run separately (two terminals):

Terminal A (API):
```powershell
npm run dev:api
```

Terminal B (frontend):
```powershell
npm run dev
```

Vite proxies `/api/*` to the local API server on port `3001`, so calls to `/api/news` from the frontend will be forwarded correctly.

**Use Vercel dev (optional)**

To mirror the serverless environment locally, use Vercel's dev server:

```powershell
$env:NEWS_API_KEY = "your_newsapi_key_here"
npx vercel dev
```

This serves both the frontend and `api/*` routes similar to production.

**Test API endpoints**

- Direct local dev API:

```powershell
Invoke-RestMethod 'http://localhost:3001/api/news?category=general'
```

- Frontend-proxied (via Vite): open the URL printed by `npm run dev` (usually `http://localhost:5173`) and use the UI.

**Deploy to Vercel**

1. Link your repository to Vercel via the dashboard or run:

```powershell
npx vercel login
npx vercel link
```

2. Add the server environment variable `NEWS_API_KEY` in the Vercel dashboard (Project → Settings → Environment Variables) or via CLI:

```powershell
npx vercel env add NEWS_API_KEY production
npx vercel env add NEWS_API_KEY preview
```

3. Deploy to production:

```powershell
npx vercel --prod
```

After deployment, the serverless function is available at `https://<your-project>.vercel.app/api/news` and uses `NEWS_API_KEY` securely.

**Troubleshooting**

- `404` on `/api/news` when running only `vite`: Vite does not serve serverless functions — use `npm run dev:api` or `npx vercel dev`.
- `Server API key missing` or `500`: `NEWS_API_KEY` not set in Vercel — add it and re-deploy.
- `401` or `apiKeyInvalid`: verify your NewsAPI key and its quota.
- Lint warnings like `process is not defined` for `api/` files: `.eslintrc.json` contains overrides to mark `api/` files as Node environment. These warnings are dev-time only.

**Dev conveniences included**

- Local mock data (`api/mock-news.json`) is used automatically by `dev-server.js` when `NEWS_API_KEY` is not set.
- `vite.config.js` proxies `/api` to the local API server so the frontend can call `/api/news` without CORS issues.

**Contributing**

- Fork, create a branch, and open a pull request. Keep secrets out of the repo.

**License & Credits**

- Replace this with your preferred license and attributions.

---

If you'd like, I can also add a small `DEPLOY.md` with screenshots of where to set env vars in the Vercel dashboard or remove the client-side fallback to avoid accidental key exposure.
