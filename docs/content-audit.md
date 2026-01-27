# Content Audit (JSON ➜ Strapi Migration)

## Scope
- Capture every JSON-backed dataset currently powering the Next.js app (`web/`) or the Strapi backend (`server/`).
- Document how each dataset is structured, which UI surfaces depend on it, and what the future Strapi entity should be.
- Highlight relationships, media dependencies, and quirks to address before migration.

## Frontend JSON Inventory
| Dataset | Path | Format | Key Consumers | Suggested Strapi target | Notes |
| --- | --- | --- | --- | --- | --- |
| Staff directory | `web/src/app/data/staff/staffData.json` | Object keyed by category (`Personal`, `Researchers`, …) → array of people records | `web/src/app/people/staff/*`, `web/src/app/people/researchers`, `web/src/app/research/{departments,publications,datasets}` | Collection type: `person` with category enum + media field | Central people source; `slug` is referenced by multiple datasets; `image` paths reference `/public/people/*`.
| Staff projects | `web/src/app/data/staff/proData.json` | Array of project objects | `web/src/app/research/{projects,themes,departments}`, `web/src/app/people/staff/[slug]/*` | Collection type: `project` + relation(s) to `person`, `department`, `theme` | `teams[]` stores `{ title, name }` where `name` is a staff slug; `domain[]` duplicates department taxonomy.
| Staff publications | `web/src/app/data/staff/pubData.json` | Array of publication objects | `web/src/app/research/publications`, `web/src/app/people/staff/[slug]` | Collection type: `publication` related to `person` | `authors[]` hold staff slugs; single `docUrl` for PDF in `/publications/`.
| Dataverse datasets | `web/src/app/data/staff/dataverseData.json` | Array of `{ name, elements[] }` | `web/src/app/people/staff/[slug]`, `web/src/app/research/datasets` | Collection type: `dataset` linked to `person` | `getDatasetsByAuthor` helper expects a map, but JSON is an array—worth fixing during migration.
| Research units | `web/src/app/data/departments/researchUnitsData.json` | Array; fields: `name`, `description` (string or string[]), `coordonator`, `co-coordonator`, `elements[] { text, content[] }` | `web/src/app/research/departments` | Collection type: `research-unit` + repeatable component for bullet sections | Mixed string/array descriptions; `elements[].content` often placeholder strings.
| Support units | `web/src/app/data/departments/supportUnitsData.json` | Array; `description[]` of paragraphs, `elements[] { text, content[] }` | `web/src/app/research/departments` | Collection type: `support-unit` | Similar structure to research units; currently only two records.
| News groups | `web/src/app/data/news&events/newsData.json` | Array; each group has `title`, `items[] { text, date{day,mouth,year}, url, image }` | `web/src/app/news&events/news/NewsClient.js` | Collection type: `news-group` or `news-item` with category relation | `date.mouth` is misspelled everywhere; `image` relative to `/public/news/*`.
| Events | `web/src/app/data/news&events/eventsData.json` | Array of `{ title, url }` | `web/src/app/news&events/events` | Collection type: `event` | No dates yet; only outbound links.
| Seminars | `web/src/app/data/news&events/seminarsData.json` | Array; `about[]`, `modules[]`, `url` | `web/src/app/news&events/seminars` | Collection type: `seminar` with repeatable rich-text blocks | Data is currently curated from Coursera-style MOOCs; expect future expansion.
| Search index | `web/public/search-index.json` | Array of `{ title, route, tags[], snippet }` | `web/src/app/search/classic/ClassicClient.jsx` (fetches from `/search-index.json`) | Collection type: `search-entry` or Strapi dynamic zone powering search API | Acts as static search metadata; migration requires either exposing Strapi REST or generating this file during build.

## Backend JSON Inventory (Strapi)
| Dataset | Path | Purpose | Notes |
| --- | --- | --- | --- |
| Demo seed | `server/data/data.json` | Sample Strapi data (`global`, `about`, `categories`, `authors`, `articles`) | Matches Strapi blog quickstart; **not aligned** with AI Institute domain. Safe to archive once real seed/migrations exist.
| Shared components | `server/src/components/shared/{quote,rich-text,media,slider,seo}.json` | Component schemas referenced by Strapi content-types | Already useful for mission/vision content blocks; extend or add new components (e.g., `stat-list`, `contact-card`) for richer CMS modeling.
| Content-type schemas | `server/src/api/{about,article,author,category,global}/content-types/**/schema.json` | Existing Strapi models | Represent blog entities; will need to be replaced with institute-specific types (departments, staff, news, etc.).

## Detailed Notes & Relationships
### Staff directory (`web/src/app/data/staff/staffData.json`)
- **Shape**: Root object with named arrays (currently `Personal`, `Researchers`). Each record stores `slug`, `name`, `title`, `phone`, `email`, `department`, and `image` (relative to `web/public/people/`).
- **Usage**: Queried throughout people and research pages for lists, profile routes, and lookup maps.
- **Relations**: `slug` is the foreign key referenced by `proData`, `pubData`, and `dataverseData`. Departments referenced here must align with the department/support-unit content types.
- **Migration**: Model as `Person` collection type with relations to `Department`, `Support Unit`, `Project`, etc. Import media into Strapi’s upload provider and rewrite image URLs on the frontend.

### Staff projects (`web/src/app/data/staff/proData.json`)
- **Shape**: Each object contains `title`, `lead`, `abstract`, `themes[]`, `teams[] { title, name }`, `region`, `domain[]`, `publication`, `partners` (string or array), `docUrl`, `oficialUrl`.
- **Usage**: Drives `/research/projects`, `/research/themes`, department highlights, and per-staff profile project tabs.
- **Relations**: `teams[].name` stores staff slugs; `domain[]` parallels department names. `publication` references `pubData` via title string.
- **Migration**: Create `Project` collection with relations to `Person`, `Department`, `Theme`, `Partner` (new type). Normalize `domain` vs. `department` to avoid duplication.

### Staff publications (`web/src/app/data/staff/pubData.json`)
- **Shape**: Publication metadata with `year`, `domain`, `kind`, long-form `description`, `authors[]` (staff slugs), and `docUrl` pointing to `/publications/*.pdf`.
- **Usage**: `/research/publications` listing and staff profile tabs.
- **Relations**: Must be linked to `Person` entries via slug; `domain` should match department taxonomy.
- **Migration**: `Publication` collection with many-to-many relation to `Person` and optional relation to `Project`. Store documents via Strapi uploads to avoid hardcoded `/publications/` paths.

### Dataverse datasets (`web/src/app/data/staff/dataverseData.json`)
- **Shape**: Array of researchers with `name` and `elements[]` describing external dataset links (`title`, `description` as URL string).
- **Usage**: Staff detail pages ("Dataverse" tab) and `/research/datasets` overview.
- **Issue**: Helper `getDatasetsByAuthor` expects an object keyed by slug; current array works only where code manually filters. Migration should formalize slug references and allow multiple datasets per person.
- **Migration**: `Dataset` collection with relation to `Person`, storing external URL + description and optional metadata.

### Research & support units (`web/src/app/data/departments/*.json`)
- **Shape**: Narrative-heavy arrays with nested `elements[]` to capture bullet sections. Fields mix plain strings and arrays of paragraphs.
- **Usage**: `/research/departments` page renders both research and support unit sections, plus staff cross-references.
- **Migration**: Model as separate `Research Unit` and `Support Unit` collection types that use repeatable components (`Section`, `BulletList`). Capture coordinators as relations to `Person` to avoid free-text duplication.

### News & events (`web/src/app/data/news&events/*.json`)
- **News**: Grouped items with `date` object (typo `mouth`), `url`, `image` path.
- **Events**: Simple list of outbound links.
- **Seminars**: Contains `about[]` and `modules[]` arrays describing MOOC/learning opportunities.
- **Usage**: `/news`, `/events`, `/events/seminars` clients.
- **Migration**: Create `NewsItem`, `Event`, and `Seminar` collection types with date fields, hero media, CTA links, and ability to order/publish via Strapi. Fix date typo during import.

### Search index (`web/public/search-index.json`)
- **Shape**: Flat list of routes with `tags[]` and `snippet` text used by the Classic search page.
- **Usage**: Fetched at runtime from `/search-index.json`.
- **Migration**: Move entries into Strapi (e.g., `search-entry` collection) and expose a lightweight `/search` API (REST or GraphQL) that the frontend can query. Alternatively, generate the JSON at build time from Strapi content.

### Existing Strapi schemas (`server/src/api/**`, `server/src/components/**`)
- Currently represent the default Strapi blog tutorial (articles, authors, categories, etc.). Migration plan should replace these schemas with ones matching the datasets above. The shared components (`quote`, `rich-text`, `media`, `slider`, `seo`) can be reused for sections such as About, Mission, and Department descriptions.

## Gaps & Open Questions
- Multiple datasets reference departments by free-text strings. Define a canonical taxonomy (`Department`, `Research Theme`, `Support Service`) in Strapi to avoid divergence.
- Media assets (people portraits, news thumbnails, PDFs) live under `web/public/**`. Need a migration strategy to upload them into Strapi while preserving stable URLs for Next.js.
- Some JSON fields contain placeholder or empty strings (e.g., `elements[].content` in departments, blank `image` fields for many staff). Decide whether to import as-is or filter.
- The `dataverseData.js` helper implies there was intent to store datasets in a keyed object. Confirm desired final structure with stakeholders before modeling in Strapi.
- Search experience currently depends on a manually maintained JSON. Determine whether Strapi should power real search or simply act as source data for a generated index.

This audit provides the baseline needed to design Strapi schemas and migration scripts in subsequent commits.