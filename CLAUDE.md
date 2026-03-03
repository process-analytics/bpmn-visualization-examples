# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **examples repository** for the [bpmn-visualization](https://github.com/process-analytics/bpmn-visualization-js) TypeScript library. It contains standalone HTML examples, full project integrations with various bundlers/frameworks, and feature-rich demo applications. It does NOT contain the library source code itself.

## Repository Structure

- **`examples/`** — Standalone HTML/JS examples loading bpmn-visualization via CDN (jsdelivr). Each subfolder has `index.html`, `index.js`, and `README.md`. Categories: `custom-behavior/`, `custom-bpmn-theme/`, `diagram-navigation/`, `display-bpmn-diagram/`, `overlays/`, `misc/`.
- **`projects/`** — Full npm project examples demonstrating integration with different bundlers/frameworks: Webpack, Angular, Lit Element, Parcel, Rollup, Rsbuild, Vite, Vue.
- **`demo/`** — Feature-rich demonstration apps (load-and-navigation, draw-path, prediction, monitoring, hacktoberfest themes).
- **`bpmn-files/`** — BPMN test diagrams with SVG/PNG previews.
- **`scripts/`** — Automation scripts (e.g., `update-lib-version.bash` to update bpmn-visualization version across all examples/projects/demos).

## Common Commands

There is no root-level `package.json` — each project under `projects/` is independent:

```bash
# Run any project example (e.g., Vite)
cd projects/typescript-vanilla-with-vitejs
npm install
npm start        # dev server
npm run build    # production build

# Angular project has tests
cd projects/typescript-angular
npm test
```

Node.js version: **20** (see `.nvmrc`).

### Updating bpmn-visualization version across all examples

```bash
./scripts/update-lib-version.bash <new_version> <integrity_hash>
```

This updates CDN references (version + SRI integrity hash) in `examples/` and `demo/`, and npm versions in `projects/`.

## Architecture & Patterns

**CDN examples** (`examples/`): Use the IIFE bundle via `<script>` tag from jsdelivr with SRI integrity hash. Access the library through the global `bpmnvisu` variable (e.g., `new bpmnvisu.BpmnVisualization({ container: 'id' })`).

**Project examples** (`projects/`): Standard npm imports (`import { BpmnVisualization } from 'bpmn-visualization'`). Each demonstrates a specific bundler/framework integration.

**Shared assets**: `examples/static/` contains shared CSS (uses Spectre.css), JS utilities, and images. `demo/static/` has shared demo assets.

All examples/projects pin to the **same bpmn-visualization version** (currently 0.47.0). Version updates are automated via a GitHub Actions workflow triggered by library releases.

## CI/CD

- **check-projects.yml** — Builds all 8 projects against both development and latest release versions of bpmn-visualization. Creates surge.sh preview deployments for PRs.
- **pr-metadata-checks.yml** — Validates PR titles follow Conventional Commits format.
- **update_bpmn_visualization_version.yml** — Auto-creates PRs when new library versions are released.

## PR & Commit Conventions

- PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `<type>[optional scope]: <lower case description>`
- Types: `chore`, `docs`, `feat`, `fix`, `refactor`, etc.
- No direct commits to `master`. PRs require 2 maintainer approvals.
- Branch naming: `<issue-number>-<feature-name>` (e.g., `25-annotations_to_tasks`).

## Adding a New Example

1. Create a new folder under `examples/` with `index.html`, `index.js`, `README.md`
2. Use the latest bpmn-visualization version with CDN integrity hash
3. Add a screenshot to `examples/static/img/`
4. Add a `div` entry in `examples/index.html`
5. Update the root `README.md`
