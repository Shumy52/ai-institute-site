# AI Institute Site - Copilot Instructions

## 🏗 Big Picture Architecture
This project is a decoupled monorepo structure for the AI Institute (AIRI) website.
- **Backend (`server/`)**: Strapi v5 (Headless CMS) utilizing SQLite (dev) or Postgres (prod). Exposes REST API.
- **Frontend (`web/`)**: Next.js 16 (App Router) + React 19 + Tailwind CSS. Consumes Strapi API.
- **Infrastructure**: Docker Compose orchestrates the `strapi`, `nextjs`, and `postgres` services.

## 🚀 Critical Developer Workflows

### 1. Build & Run
- **Full Stack**: Run `docker compose up --build` to start all services.
- **Frontend Only**: `cd web && npm run dev` (Runs on localhost:3000).
- **Backend Only**: `cd server && npm run develop` (Runs on localhost:1337).
- **Strapi Schema Changes**: Modifying content types in `server/src/api/*/content-types/` usually requires a **backend restart** (or Docker rebuild) to regenerate types. Updates don't always hot-reload safely.

### 2. Data Migration & Seeding
The project uses a custom migration script to strictly type and import legacy JSON data into Strapi.
- **Seed Command**:
  ```bash
  # Must run from project root with containers active
  docker cp web/src/app/data ai-institute-site-strapi-1:/app/migration-data
  docker exec -it ai-institute-site-strapi-1 /bin/sh -c "MIGRATION_DATA_ROOT=/app/migration-data node /app/scripts/migrate-json.js"
  ```
- **Result**: Data populates Strapi, and entries are automatically Published.

### 3. Permissions
- **Public Access**: Do **not** manually configure "Public" role permissions in Strapi Admin for standard types. 
- **Automation**: `server/src/index.ts` automatically grants `find` and `findOne` to the Public role on bootstrap for core types (`person`, `project`, `publication`, etc.).

## 🧩 Project Conventions & Patterns

### Strapi Integration (`web/src/lib/strapi.js`)
- **Data Fetching**: Next.js Server Components fetch data using helper functions from `@/lib/strapi` (e.g., `getStaff`).
- **Population**: Use `setPopulate` helper to handle complex Strapi v5 population logic.
- **Media**: Always use `resolveMediaUrl(mediaObj)` to handle local vs relative vs absolute S3 URLs safely.
- **Transformers**: Raw Strapi responses are "transformed" (flattened) before passing to Client Components.

### Next.js App Router Structure
- **Server Components**: Perform the fetch (`async function Page()`).
- **Client Components**: Handle interaction (e.g., `ResearchersClient.js` handles filtering/tabs) and accept plain data props.
- **Filtering**: `PERSON_TYPE_FILTERS` in `strapi.js` defines mappings (e.g., `staff` includes 'staff', 'personal').

### Styling
- **Tailwind**: Utility-first.
- **DarkMode**: `DarkModeBubble.js` handles theme toggling.

## ⚠️ Gotchas
- **Strapi v5**: Note that population syntax and response structure differ from v4. Deep filtering often requires precise `populate` objects.
- **Image Paths**: Static images in `web/public` are referenced as `/folder/image.png`. Dynamic Strapi images need the `STRAPI_URL` prefix (handled by `resolveMediaUrl`).
- **Health Checks**: The Docker health check for Strapi uses `netstat` and `grep` due to startup timing issues.
