'use strict';

const path = require('path');
const fs = require('fs-extra');

const resolveDataRoot = () => {
  const fromEnv = process.env.MIGRATION_DATA_ROOT;
  if (fromEnv) {
    const absolute = path.resolve(fromEnv);
    if (fs.existsSync(absolute)) {
      return absolute;
    }
    console.warn(`⚠️  MIGRATION_DATA_ROOT provided but not found: ${absolute}`);
  }

  const candidates = [
    path.resolve(process.cwd(), '..', 'web', 'src', 'app', 'data'),
    path.resolve(process.cwd(), 'web', 'src', 'app', 'data'),
    path.resolve(__dirname, '..', '..', 'web', 'src', 'app', 'data'),
    path.resolve(__dirname, '..', 'web', 'src', 'app', 'data'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    `Unable to locate JSON dataset folder. Checked locations:\n${candidates
      .map((entry) => `  - ${entry}`)
      .join('\n')}\nSet MIGRATION_DATA_ROOT to override.`
  );
};

const DATA_ROOT = resolveDataRoot();

const nowISO = () => new Date().toISOString();

const toKey = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const toSlug = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const readJson = async (...segments) => {
  const absPath = path.join(DATA_ROOT, ...segments);
  if (!(await fs.pathExists(absPath))) {
    throw new Error(`Missing JSON data file: ${absPath}`);
  }
  return fs.readJSON(absPath);
};

const extractArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
};

const extractString = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((line) => String(line || '').trim())
      .filter(Boolean)
      .join('\n');
  }
  return value ? String(value).trim() : '';
};

const getDocId = (doc) => (doc && (doc.documentId || doc.id || doc.document_id)) || null;

const pickFirst = (value) => (Array.isArray(value) ? value[0] : value);

async function findDocument(uid, filters) {
  const payload = {
    filters,
    publicationState: 'preview',
    pagination: { page: 1, pageSize: 1 },
  };
  const res = await strapi.documents(uid).findMany(payload);
  const results = Array.isArray(res?.results) ? res.results : Array.isArray(res) ? res : [];
  return results.length ? results[0] : null;
}

async function importDepartmentsAndResearchUnits(state) {
  const units = await readJson('departments', 'researchUnitsData.json');
  const departmentDocs = {};

  console.log(`\n⏳ Importing departments & research units (${units.length} units detected)`);

  for (const unit of units) {
    const name = String(unit?.name || '').trim();
    if (!name) continue;

    const normalizedKey = toKey(name);
    if (state.departments[normalizedKey]) continue;

    const description = extractString(unit?.description);

    const existing = await findDocument('api::department.department', {
      name: { $eqi: name },
    });

    let departmentDoc = existing;

    if (!existing) {
      departmentDoc = await strapi.documents('api::department.department').create({
        data: {
          name,
          slug: toSlug(name),
          description,
          publishedAt: nowISO(),
        },
      });
      console.log(`  ✅ created department: ${name}`);
    } else {
      console.log(`  ◼︎ skipped existing department: ${name}`);
    }

    departmentDocs[normalizedKey] = departmentDoc;
    state.departments[normalizedKey] = departmentDoc;
    state.departmentsByName[name] = departmentDoc;
  }

  for (const unit of units) {
    const name = String(unit?.name || '').trim();
    if (!name) continue;

    const existing = await findDocument('api::research-unit.research-unit', {
      name: { $eqi: name },
    });

    if (existing) {
      console.log(`  ◼︎ skipped existing research unit: ${name}`);
      state.researchUnits[toKey(name)] = existing;
      continue;
    }

    const description = extractString(unit?.description);
    const summaryCandidate = Array.isArray(unit?.description)
      ? pickFirst(unit.description)
      : unit?.description;
    const summary = summaryCandidate ? String(summaryCandidate).trim().slice(0, 240) : '';

    const departmentKey = toKey(name);
    const departmentDoc = departmentDocs[departmentKey];
    const departmentId = getDocId(departmentDoc);

    const payload = {
      name,
      slug: toSlug(name),
      icon: unit?.icon || null,
      summary,
      description,
      details: unit?.details || null,
      elements: unit?.elements || [],
      coordinator: unit?.coordonator || unit?.coordinator || '',
      deputy_coordinator: unit?.['co-coordonator'] || unit?.deputy_coordinator || '',
      publishedAt: nowISO(),
    };

    if (departmentId) {
      payload.departments = { connect: [departmentId] };
    }

    const researchUnitDoc = await strapi.documents('api::research-unit.research-unit').create({
      data: payload,
    });

    console.log(`  ✅ created research unit: ${name}`);

    state.researchUnits[toKey(name)] = researchUnitDoc;
  }
}

async function importPeople(state) {
  const raw = await readJson('staff', 'staffData.json');
  const people = [];

  for (const [category, list] of Object.entries(raw || {})) {
    if (!Array.isArray(list)) continue;
    for (const entry of list) {
      people.push({ ...entry, category });
    }
  }

  console.log(`\n⏳ Importing people (${people.length} records found)`);

  for (const person of people) {
    const fullName = String(person?.name || '').trim();
    if (!fullName) continue;

    const slug = String(person?.slug || '').trim() || toSlug(fullName);
    const normalizedSlug = toKey(slug);

    if (state.peopleBySlug[slug] || state.peopleByKey[normalizedSlug]) {
      continue;
    }

    const existing = await findDocument('api::person.person', {
      slug: { $eqi: slug },
    });

    if (existing) {
      state.peopleBySlug[slug] = existing;
      state.peopleByKey[normalizedSlug] = existing;
      state.peopleByKey[toKey(fullName)] = existing;
      console.log(`  ◼︎ skipped existing person: ${fullName}`);
      continue;
    }

    const departmentName = String(person?.department || '').trim();
    let departmentId = null;
    if (departmentName) {
      const departmentDoc =
        state.departments[toKey(departmentName)] ||
        (await findDocument('api::department.department', { name: { $eqi: departmentName } }));
      departmentId = getDocId(departmentDoc);
    }

    const payload = {
      full_name: fullName,
      slug,
      title: person?.title || '',
      phone: person?.phone || '',
      email: person?.email || '',
      role: '',
      category: person?.category || '',
      publishedAt: nowISO(),
    };

    if (departmentId) {
      payload.department = { connect: [departmentId] };
    }

    const created = await strapi.documents('api::person.person').create({
      data: payload,
    });

    console.log(`  ✅ created person: ${fullName}`);

    state.peopleBySlug[slug] = created;
    state.peopleByKey[normalizedSlug] = created;
    state.peopleByKey[toKey(fullName)] = created;
  }
}

function lookupPerson(state, value) {
  const slug = String(value || '').trim();
  if (!slug) return null;
  const bySlug = state.peopleBySlug[slug];
  if (bySlug) return bySlug;

  const normalized = toKey(slug);
  if (state.peopleByKey[normalized]) return state.peopleByKey[normalized];

  return null;
}

async function importPublications(state) {
  const publications = await readJson('staff', 'pubData.json');
  console.log(`\n⏳ Importing publications (${publications.length} records found)`);

  for (const pub of publications) {
    const title = String(pub?.title || '').trim();
    if (!title) continue;

    const slug = toSlug(title);
    if (state.publications[slug]) continue;

    const existing = await findDocument('api::publication.publication', {
      slug: { $eqi: slug },
    });

    if (existing) {
      state.publications[slug] = existing;
      continue;
    }

    const departmentName = String(pub?.domain || '').trim();
    let departmentId = null;
    if (departmentName) {
      const departmentDoc =
        state.departments[toKey(departmentName)] ||
        (await findDocument('api::department.department', { name: { $eqi: departmentName } }));
      departmentId = getDocId(departmentDoc);
    }

    const authorIds = [];
    const authorValues = Array.isArray(pub?.authors) ? pub.authors : [];
    for (const author of authorValues) {
      const authorDoc = lookupPerson(state, author);
      const id = getDocId(authorDoc);
      if (id) authorIds.push(id);
    }

    const payload = {
      title,
      slug,
      year: Number.isFinite(pub?.year) ? pub.year : null,
      kind: pub?.kind || '',
      description: extractString(pub?.description),
      doc_url: pub?.docUrl || pub?.doc_url || '',
      external_url: pub?.externalUrl || pub?.external_url || '',
      metadata: pub?.metadata || null,
      publishedAt: nowISO(),
    };

    if (departmentId) {
      payload.domain = { connect: [departmentId] };
    }

    if (authorIds.length) {
      payload.authors = { connect: authorIds };
    }

    const created = await strapi.documents('api::publication.publication').create({
      data: payload,
    });

    console.log(`  ✅ created publication: ${title}`);

    state.publications[slug] = created;
  }
}

async function importProjects(state) {
  const projects = await readJson('staff', 'proData.json');
  console.log(`\n⏳ Importing projects (${projects.length} records found)`);

  for (const proj of projects) {
    const title = String(proj?.title || '').trim();
    if (!title) continue;

    const slug = toSlug(title);
    if (state.projects[slug]) continue;

    const existing = await findDocument('api::project.project', {
      slug: { $eqi: slug },
    });

    if (existing) {
      state.projects[slug] = existing;
      continue;
    }

    const domainNames = Array.isArray(proj?.domain) ? proj.domain : extractArray(proj?.domain);
    const domainIds = [];
    for (const name of domainNames) {
      const depDoc = state.departments[toKey(name)] || (await findDocument('api::department.department', { name: { $eqi: name } }));
      const id = getDocId(depDoc);
      if (id) domainIds.push(id);
    }

    const memberDocs = Array.isArray(proj?.teams) ? proj.teams : [];
    const memberIds = [];
    for (const member of memberDocs) {
      const personDoc = lookupPerson(state, member?.name || member?.slug || member);
      const id = getDocId(personDoc);
      if (id) memberIds.push(id);
    }

    const leadDoc = lookupPerson(state, proj?.lead);
    const leadId = getDocId(leadDoc);

    const relatedPublicationTitle = String(proj?.publication || '').trim();
    const publicationSlug = relatedPublicationTitle ? toSlug(relatedPublicationTitle) : null;
    const publicationDoc = publicationSlug ? state.publications[publicationSlug] : null;
    const publicationId = getDocId(publicationDoc);

    const partners = extractArray(proj?.partners).filter(Boolean);

    const payload = {
      title,
      slug,
      abstract: proj?.abstract || '',
      region: proj?.region || 'national',
      themes: Array.isArray(proj?.themes) ? proj.themes : [],
      partners,
      doc_url: proj?.docUrl || proj?.doc_url || '',
      official_url: proj?.oficialUrl || proj?.officialUrl || '',
      publishedAt: nowISO(),
    };

    if (leadId) {
      payload.lead = { connect: [leadId] };
    }

    if (memberIds.length) {
      payload.members = { connect: memberIds };
    }

    if (domainIds.length) {
      payload.domains = { connect: domainIds };
    }

    if (publicationId) {
      payload.publications = { connect: [publicationId] };
    }

    const created = await strapi.documents('api::project.project').create({
      data: payload,
    });

    console.log(`  ✅ created project: ${title}`);

    state.projects[slug] = created;
  }
}

async function importDatasets(state) {
  const owners = await readJson('staff', 'dataverseData.json');

  let total = 0;
  for (const owner of owners) {
    if (Array.isArray(owner?.elements)) {
      total += owner.elements.length;
    }
  }

  console.log(`\n⏳ Importing datasets (${total} records detected)`);

  for (const owner of owners) {
    const ownerDoc = lookupPerson(state, owner?.name);
    const ownerId = getDocId(ownerDoc);

    if (!Array.isArray(owner?.elements) || !owner?.elements.length) continue;

    for (const dataset of owner.elements) {
      const title = String(dataset?.title || '').trim();
      if (!title) continue;

      const slug = toSlug(title);
      if (state.datasets[slug]) continue;

      const existing = await findDocument('api::dataset.dataset', {
        slug: { $eqi: slug },
      });

      if (existing) {
        state.datasets[slug] = existing;
        continue;
      }

      const payload = {
        title,
        slug,
        summary: dataset?.description ? String(dataset.description).trim().slice(0, 240) : '',
        description: extractString(dataset?.description),
        tags: dataset?.tags || null,
        source_url: dataset?.url || '',
        publishedAt: nowISO(),
      };

      if (ownerId) {
        payload.authors = { connect: [ownerId] };
      }

      const created = await strapi.documents('api::dataset.dataset').create({
        data: payload,
      });

      console.log(`  ✅ created dataset: ${title}`);

      state.datasets[slug] = created;
    }
  }
}

async function runMigration() {
  const state = {
    departments: {},
    departmentsByName: {},
    researchUnits: {},
    peopleBySlug: {},
    peopleByKey: {},
    publications: {},
    projects: {},
    datasets: {},
  };

  await importDepartmentsAndResearchUnits(state);
  await importPeople(state);
  await importPublications(state);
  await importProjects(state);
  await importDatasets(state);

  console.log('\n🎉 JSON migration script finished.');
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  try {
    await runMigration();
  } catch (error) {
    console.error('Migration failed:', error);
  }

  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
