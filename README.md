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
npm run dev
```

- To emulate Vercel serverless functions locally (recommended when developing the `api/` routes):

```powershell
# set the env var for this session (PowerShell)
$env:NEWS_API_KEY = "your_newsapi_key_here"

# run vercel dev which will serve both frontend and /api/* serverless functions
vercel dev
```

3. Deploy to Vercel:
- Add `NEWS_API_KEY` in the Vercel Project Settings > Environment Variables (or use `vercel env add NEWS_API_KEY`), then deploy via the Vercel UI or `vercel --prod`.

4. Troubleshooting:
- If `/api/news` 404s locally, that's expected when running only `vite` — Vite does not run serverless functions. Use `vercel dev` to test `api/` endpoints locally.
- After deploy, check Vercel function logs (Project → Deployments → View Logs) for errors and ensure `NEWS_API_KEY` is set for the environment (Preview/Production).
