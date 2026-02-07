# flip

Monorepo for **flip-clock**, a distributable React flip clock countdown component, and a Next.js showcase app.

## Structure

- **packages/flip-clock** — npm package: the FlipClock component (publish this to npm).
- **apps/showcase** — Next.js app that demos the component.

## Development

1. Install dependencies (from repo root):

   ```bash
   pnpm install
   ```

2. Build the library:

   ```bash
   pnpm build:lib
   # or
   pnpm --filter flip-clock build
   ```

3. Run the showcase app:

   ```bash
   pnpm dev:showcase
   # or
   pnpm --filter showcase dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

After changing the library, rebuild with `pnpm --filter flip-clock build` (or use `pnpm --filter flip-clock dev` for watch mode), then refresh the showcase.

## Publishing

Publish only the **flip-clock** package:

```bash
cd packages/flip-clock
pnpm build
npm publish
# or
pnpm publish
```

The root of this repo is `private: true` and is not published.
