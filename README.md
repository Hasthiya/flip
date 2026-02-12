# flip

Monorepo for **flip-clock**, a distributable React flip clock countdown component, and a Next.js showcase app.

## Structure

- **packages/flip-clock** — npm package: the FlipClock component.
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

The root of this repo is `private: true` and is not published.

## License

MIT
