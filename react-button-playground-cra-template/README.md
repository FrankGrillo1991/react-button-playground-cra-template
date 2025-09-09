# React Button Bug Playground (CRA + Tailwind)

A ready-to-run Create React App template with Tailwind preconfigured and a playground that demonstrates common React button bugs (broken vs fixed).

## Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Start dev server
npm start
```

Open http://localhost:3000 in your browser.

## What's Included
- **Create React App** (react-scripts 5)
- **Tailwind CSS** (preconfigured)
- **React Router** (MemoryRouter for the demos)

## File Structure
```
react-button-playground-cra-template/
├─ public/
│  └─ index.html
├─ src/
│  ├─ App.js
│  ├─ index.css
│  └─ index.js
├─ package.json
├─ postcss.config.js
└─ tailwind.config.js
```

## Notes
- The playground uses `MemoryRouter` so you can see route changes without a real server.
- The `/abot` route is intentionally missing to demonstrate a navigation typo.
