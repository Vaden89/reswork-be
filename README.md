# reswork-be

TypeScript/Express backend for Reswork.

## Requirements

- Node.js 22+
- pnpm 11.5.2+

## Local development

```sh
pnpm install
pnpm dev
```

The server listens on `PORT` or `3001` by default. A health endpoint is available at `GET /health`.

## Environment variables

Configure these in Railway:

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Railway injects this automatically. The app defaults to `3001` locally. |
| `NODE_ENV` | No | Set to `production` in Railway. |
| `CORS_ORIGIN` | Yes for production | Allowed frontend origin, for example `https://your-app.com`. |
| `CONVEX_URL` | Yes | Convex deployment URL used by the HTTP client. |
| `CONVEX_SITE_URL` | Yes | Convex site URL used for JWT issuer/JWKS verification. |
| `GEMINI_API_KEY` | Yes | Google Gemini API key. |

Do not commit real secrets. Keep local values in `.env` and configure production values in Railway Variables.

## Production build

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

`pnpm build` compiles TypeScript into `dist/`; `pnpm start` runs `node dist/index.js`.

## Railway deployment

This repo includes `railway.json` configured for Railway Nixpacks:

- Builder: `NIXPACKS`
- Build command: `pnpm build`
- Start command: `pnpm start`
- Health check path: `/health`

Railway will install dependencies using pnpm because `package.json` declares `packageManager: pnpm@11.5.2`.

### Deploy steps

1. Create a new Railway project from this GitHub repo.
2. In Railway Variables, add:
   - `NODE_ENV=production`
   - `CORS_ORIGIN=<your deployed frontend URL>`
   - `CONVEX_URL=<your Convex URL>`
   - `CONVEX_SITE_URL=<your Convex site URL>`
   - `GEMINI_API_KEY=<your Gemini API key>`
3. Deploy the service.
4. After deployment, verify `https://<your-railway-domain>/health` returns `message: "alive"`.
