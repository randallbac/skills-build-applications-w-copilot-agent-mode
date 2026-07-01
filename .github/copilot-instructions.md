# OctoFit Tracker – Copilot Instructions

## Architecture

Three-tier application in `octofit-tracker/`:

```
octofit-tracker/
├── backend/   # Logic tier – Node.js + Express + TypeScript, port 8000
└── frontend/  # Presentation tier – React 19 + Vite, port 5173
               # Data tier – MongoDB on port 27017 (database: octofit_db)
```

Request flow: **Frontend → `API_BASE/api/<resource>/` → Express routes → Mongoose models → MongoDB**

The frontend never talks to MongoDB directly. All data access goes through the Express API.

## Commands

**Never `cd` into a directory — always use path-qualified commands.**

### Backend

```bash
# Dev server (hot reload)
npm run dev --prefix octofit-tracker/backend

# Build TypeScript
npm run build --prefix octofit-tracker/backend

# Start compiled output
npm run start --prefix octofit-tracker/backend

# Seed octofit_db with test data
npm run seed --prefix octofit-tracker/backend

# Type check only (no emit)
octofit-tracker/backend/node_modules/.bin/tsc --noEmit
```

### Frontend

```bash
# Dev server on port 5173
npm run dev --prefix octofit-tracker/frontend -- --port 5173 --host

# Production build
npm run build --prefix octofit-tracker/frontend

# Lint
npm run lint --prefix octofit-tracker/frontend
```

### MongoDB

```bash
# Check if running
ps aux | grep mongod

# Start (Codespace/devcontainer handles this via post_start.sh)
mongod --dbpath /data/db --fork --logpath /tmp/mongod.log

# Connect
mongosh mongodb://localhost:27017/octofit_db
```

## Ports

| Port  | Service           | Visibility |
|-------|-------------------|------------|
| 8000  | Express API       | public     |
| 5173  | Vite dev server   | public     |
| 27017 | MongoDB           | private    |

Do not use or expose any other ports.

## Codespaces URL pattern

Both tiers resolve their base URL from `CODESPACE_NAME` / `VITE_CODESPACE_NAME`:

**Backend** (`src/server.ts`):
```ts
const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
```

**Frontend** (`src/api.js`):
```js
export const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
```

When running locally, set `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`.

## Key conventions

### Backend

- **Entry point split**: `src/index.ts` is a minimal 5-line launcher; all app config (middleware, routes, CORS) lives in `src/server.ts`.
- **Database module**: MongoDB connection is centralised in `src/config/database.ts`. Import `connectDB` from there — do not call `mongoose.connect()` inline.
- **Route files**: one file per resource in `src/routes/`. Each exports a default Express `Router` with full CRUD. Mounted under `/api/<resource>` in `server.ts`.
- **Models**: one file per resource in `src/models/`. Use Mongoose `Schema` + `model()`. Relations use `Types.ObjectId` refs (not embedded docs).
- **TypeScript**: strict mode enabled. Run `tsc --noEmit` to validate before committing.

### Frontend

- **API utility**: all fetch calls use `API_BASE` and `toArray()` from `src/api.js`. `toArray()` handles both plain arrays and paginated `{ results: [] }` shapes — always pipe API responses through it.
- **Components**: one file per resource in `src/components/`. Each fetches its own data with `useEffect` + `useState`. No shared data-fetching layer.
- **Routing**: `BrowserRouter` wraps the app in `main.jsx`; all `<Route>` declarations are in `App.jsx`.
- **Styling**: Bootstrap 5 classes only — no custom CSS files for new components.

### Seed data

`src/scripts/seed.ts` clears and re-populates all five collections. It is safe to re-run. Uses `connectDB()` from the shared database module.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/api/users/` | List / create users |
| GET/PUT/DELETE | `/api/users/:id` | Single user |
| GET/POST | `/api/teams/` | List / create teams (members populated) |
| GET/POST | `/api/activities/` | List / create activities (user populated) |
| GET/POST | `/api/leaderboard/` | List ranked entries / add entry |
| GET/POST | `/api/workouts/` | List / create workouts |

## Devcontainer

`post_create.sh` installs `mongodb-org`. `post_start.sh` sets port visibility and starts `mongod` with retry logic. Both scripts require `CODESPACE_NAME` to be set (Codespaces only).
