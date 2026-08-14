# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **bpmn-visualization-examples** repository — a collection of standalone examples, framework integration projects, and demos showing how to use the [bpmn-visualization](https://github.com/process-analytics/bpmn-visualization-js) TypeScript library for BPMN diagram visualization.

This is **not a monorepo with a root build**. Each project in `projects/` is independent with its own `package.json` and build tooling. Examples in `examples/` are standalone HTML files that load `bpmn-visualization` via CDN (no build required).

## Repository Structure

- `examples/` — Standalone HTML/JS examples loaded via CDN. Each subfolder contains an `index.html` and optional `index.js`. The `examples/index.html` is the homepage that links to all examples.
- `projects/` — Framework integration examples, each with its own build system: Angular, Vue, Lit Element, Vite, Webpack, Parcel, Rollup, Rsbuild.
- `demo/` — Comprehensive demo applications (monitoring, prediction, path drawing, etc.).
- `tutorials/` — Getting started guides.
- `bpmn-files/` — BPMN diagram test files used across examples.
- `scripts/update-lib-version.bash` — Updates `bpmn-visualization` version across all examples/projects/demo (both npm versions and CDN integrity hashes).

## Development Commands

**Node version**: 20 (see `.nvmrc`)

### Running standalone examples locally

Examples use ES Modules and cannot be opened directly from disk. Use a local web server from the repository root:
```bash
python3 -m http.server 8002          # then go to http://localhost:8002/examples/
npx http-server --port 8003 -o ./examples
```

### Working with framework projects

Each project in `projects/` is independent:
```bash
cd projects/<project-name>
npm install
npm start       # dev server
npm run build   # production build
```

There is no root-level `npm install` or build command.

### npm configuration

- `package-lock=false` in `.npmrc` — lock files are not committed.
- Some projects use `legacy-peer-deps=true` for peer dependency resolution.

## CI/CD

- **check-projects.yml** — Builds all projects on PR/push, testing against both the released and development versions of `bpmn-visualization`. Deploys PR previews to surge.sh.
- **pr-metadata-checks.yml** — Validates PR titles follow Conventional Commits format.
- **update_bpmn_visualization_version.yml** — Auto-updates the library version across all examples and creates a PR.

## Conventions

### PR and commit conventions

- PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `<type>[optional scope]: <lower case description>`
- Common types: `feat`, `fix`, `chore`, `refactor`, `docs`, `ci`
- Common scopes: `gha`, `deps`, `deps-dev`, framework names like `vue`
- Commits in a PR are squashed on merge; the PR title becomes the commit message.

### Adding a new example

1. Create a new folder in `examples/` with an `index.html` (use latest lib version via CDN)
2. Add a screenshot in `examples/static/img/`
3. Add a card `div` in `examples/index.html`
4. Create a README in the new folder
5. Update `README.md`

### Code style

- 2-space indentation, UTF-8, single quotes in TypeScript (see `.editorconfig`)
- TypeScript strict mode enabled in all projects
