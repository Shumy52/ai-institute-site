# Target Strapi Content Architecture

This document translates the JSON audit into Strapi entities and relationships so we can scaffold the CMS before migrating data.

## Core Collection Types

### Person
- **Purpose**: Consolidate all staff/researcher records currently sourced from `staffData.json`.
- **Key fields**: `slug` (UID), `fullName`, `titles` (repeatable), `email`, `phone`, `bio`, `portrait` (media), `status` (enum: Personal, Researcher, Alumni, etc.), `socialLinks` (component).
- **Relations**: `department` (many-to-one), `supportUnits` (many-to-many), `projects` (many-to-many), `publications` (many-to-many), `datasets` (one-to-many), `newsMentions` (many-to-many).

### Department (Research Unit)
- **Purpose**: Replace `researchUnitsData.json` entries.
- **Key fields**: `name`, `slug`, `summary`, `heroImage`, `body` (dynamic zone using shared components), `coordinator` (relation to Person), `coCoordinator` (relation), `focusAreas` (component for bullet text + optional content list).
- **Relations**: `people` (many-to-many), `projects`, `publications`, `newsItems`.

### Support Unit
- Similar to Department but simpler: `name`, `slug`, `mission`, `body` dynamic zone, `lead` relation, `services` component list.

### Project
- **Purpose**: Capture `proData.json` with structured metadata.
- **Key fields**: `title`, `slug`, `abstract`, `region` (enum), `status` (enum), `themes` (many-to-many to Research Theme), `domains` (many-to-many to Department), `partners` (component list), `docUrl`, `officialUrl`, `heroImage`, `timeline` component.
- **Relations**: `lead` (Person), `teamMembers` (many-to-many Person with role field via component), `publications` (many-to-many).

### Publication
- **Purpose**: Replace `pubData.json`.
- **Key fields**: `title`, `slug`, `year` (int), `domain` (relation to Department), `kind` (enum), `abstract`, `document` (media), `externalLink`.
- **Relations**: `authors` (many-to-many Person), `projects` (many-to-many), `datasets` (many-to-many).

### Dataset
- **Purpose**: Capture Dataverse references.
- **Key fields**: `title`, `slug`, `description`, `platform` (enum), `url`, `attachments` (media), `tags`.
- **Relations**: `owners` (many-to-many Person), `relatedProjects`, `relatedPublications`.

### News Item
- **Purpose**: Replace `newsData.json` groups; flatten to single entries with category.
- **Key fields**: `title`, `slug`, `summary`, `publishedAt`, `category` (enum: Announcement, Construction Update, etc.), `linkUrl`, `heroImage`.
- **Relations**: `relatedDepartments`, `relatedProjects`, `featuredPeople`.

### Event
- **Purpose**: Replace `eventsData.json`.
- **Key fields**: `title`, `slug`, `startDate`, `endDate`, `location`, `ctaUrl`, `body`.
- **Relations**: `organizers` (Person/Department), `speakers` (Person), `relatedProjects`.

### Seminar
- **Purpose**: Replace `seminarsData.json` entries.
- **Key fields**: `title`, `slug`, `description`, `modules` (component list with `title`, `content`), `ctaUrl`, `featuredImage`.

### Search Entry
- **Purpose**: Manage the data behind `search-index.json`.
- **Key fields**: `title`, `route`, `snippet`, `tags`.
- **Automation**: Optionally auto-populate via lifecycle hooks when publishing pages, or keep as manual entries.

## Supporting Types & Components
- **Research Theme**: Collection for taxonomy used by Projects/Publications.
- **Partner Organization**: Collection referenced by Projects (name, logo, url, country).
- **Media Asset**: Consider leveraging Strapi upload plugin with folders per domain (people, news, publications, etc.).
- **Components**:
  - `shared.section`: `heading`, `body`, `media`.
  - `shared.focus-item`: `title`, `description`, `richContent`.
  - `shared.contact-link`: `label`, `url`, `icon`.
  - `project.team-member`: relation to Person + `role` text.
  - `project.timeline-entry`: `label`, `date`, `description`.

## Single Types
- **Global Settings**: Extend existing `global` singleton with institute name, brand colors, analytics IDs.
- **About Page**: Single type powering `/about` (Mission, History, etc.) using dynamic zones for mission/vision content so components like `MissionClient` simply fetch Strapi data.
- **Homepage**: Manage hero, featured projects, calls to action.

## API & Access Considerations
- Enable REST + GraphQL for all new types.
- Configure public roles (read-only) for content needed on the public site; restrict creation/edit to authenticated admin role.
- Use Strapi filters/populate options to deliver nested relations (e.g., `Person` -> `projects.teamMembers`).

## Migration Sequencing
1. Scaffold components and taxonomy types (`Research Theme`, `Partner`).
2. Create People, Departments, Support Units.
3. Add Projects/Publications/Datasets referencing people + departments.
4. Introduce News/Events/Seminars and Search Entries.
5. Update single types (About, Global, Homepage).
6. Write migration scripts to import JSON data respecting the new relations.

This schema plan supersedes the default blog models currently checked in under `server/src/api/*` and provides the blueprint for upcoming commits.
