## Project Overview

- TypeScript + Vite+

## Commands

- Install dependencies: `vp i`
- Run all tests: `vpr test`
- Run single test file: `vp test -- path/to/test.ts`
- Lint: `vpr lint`
- Type check: `vpr lint`
- Format: `vpr fmt`
- Check Every File(lint,test,typecheck): `vpr check`

## Testing

- framework: Vitest
- import package: `vite-plus/test` e.g. `import { it } from "vite-plus/test"`

## Git

DO NOT RUN GIT COMMAND

## Boundaries

- do not install pnpm/npm/yarn/bun
- do not use command of `tsc`,`oxlint`,`oxfmt`,`vitest` and `pnpm`