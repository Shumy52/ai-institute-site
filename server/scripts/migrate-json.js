'use strict';

const path = require('path');
const fs = require('fs-extra');
const mime = require('mime-types');

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
console.log(`Using migration data root: ${DATA_ROOT}`);

const nowISO = () => new Date().toISOString();

const pad2 = (value) => String(value).padStart(2, '0');

const toISODate = (dateLike) => {
  if (!dateLike || typeof dateLike !== 'object') return null;
  const year = Number(dateLike.year ?? 0);
  const month = Number(dateLike.month ?? dateLike.mouth ?? 0);
  const day = Number(dateLike.day ?? 0);
  if (!year || !month || !day) return null;
  return `${year}-${pad2(month)}-${pad2(day)}`;
};

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function getFileDataFromPath(filePath) {
  const base = path.basename(filePath);
  const ext = base.split('.').pop();
  const mimeType = mime.lookup(ext || '') || '';
  return {
    filepath: filePath,
    originalFileName: base,
    size: getFileSizeInBytes(filePath),
    mimetype: mimeType,
  };
}

async function uploadFile(file, name) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: file,
      data: {
        fileInfo: {
          alternativeText: name,
          caption: name,
          name,
        },
      },
    });
}

async function ensureUploadedSingleImage(absFilePath) {
  if (!absFilePath) return null;
  if (!fs.existsSync(absFilePath)) return null;

  const base = path.basename(absFilePath);
  const nameNoExt = base.replace(/\..*$/, '');

  const existing = await strapi.query('plugin::upload.file').findOne({
    where: {
      name: nameNoExt,
    },
  });

  if (existing) return existing;

  const fileData = getFileDataFromPath(absFilePath);
  const [uploaded] = await uploadFile(fileData, nameNoExt);
  return uploaded || null;
}

// Helper to publish a document after creation
const publishDocument = async (uid, documentId) => {
  if (!uid || !documentId) return;
  try {
    await strapi.documents(uid).publish({ documentId });
  } catch (error) {
    const details = error?.details || error?.response?.data || null;
    console.warn(`  ⚠️  Failed to publish ${uid} ${documentId}:`, error.message);
    if (details) console.warn('    details:', details);
  }
};

const STATUS_MAP = {
  personal: 'personal',
  Personal: 'personal',
  researchers: 'researcher',
  Researchers: 'researcher',
};

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

const hasJson = async (...segments) => {
  const absPath = path.join(DATA_ROOT, ...segments);
  return fs.pathExists(absPath);
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

const extractParagraphs = (value) => {
  const list = Array.isArray(value) ? value : value ? [value] : [];
  return list
    .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
    .filter(Boolean);
};

const toRichTextBlocks = (paragraphs) => {
  if (!paragraphs.length) return [];
  return [
    {
      __component: 'shared.rich-text',
      body: paragraphs.join('\n\n'),
    },
  ];
};

const toFocusItems = (elements = []) =>
  elements
    .map((element) => {
      const description = extractString(element?.content).trim();
      if (!element?.text && !description) return null;
      return {
        title: element?.text || 'Details',
        description,
        richContent: description,
      };
    })
    .filter(Boolean);

const getEntityId = (doc) => (doc && (doc.id ?? doc.ID ?? doc._id)) || null;
const getDocumentId = (doc) => (doc && (doc.documentId || doc.document_id)) || null;


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

async function importDepartments(state) {
  const units = await readJson('departments', 'researchUnitsData.json');
  console.log(`\n⏳ Importing departments (${units.length} units detected)`);

  for (const unit of units) {
    const name = String(unit?.name || '').trim();
    if (!name) continue;

    const normalizedKey = toKey(name);
    const paragraphs = extractParagraphs(unit?.description);
    const description = paragraphs.join('\n\n');
    const focusItems = toFocusItems(unit?.elements);

    const existing = await findDocument('api::department.department', {
      name: { $eqi: name },
    });

    const baseData = {
      name,
      slug: toSlug(name),
      summary: paragraphs[0] || '',
      description,
      body: toRichTextBlocks(paragraphs),
      focusItems,
      contactLinks: unit?.contactLinks || [],
    };

    let departmentDoc;
    if (existing) {
      departmentDoc = await strapi
        .documents('api::department.department')
        .update({
          documentId: getDocumentId(existing),
          data: baseData,
        });
      await publishDocument('api::department.department', getDocumentId(departmentDoc));
      console.log(`  🔁 updated department: ${name}`);
    } else {
      departmentDoc = await strapi
        .documents('api::department.department')
        .create({
          data: baseData,
        });
      await publishDocument('api::department.department', getDocumentId(departmentDoc));
      console.log(`  ✅ created department: ${name}`);
    }

    state.departments[normalizedKey] = departmentDoc;
    state.departmentsByName[name] = departmentDoc;
    state.departmentMeta[normalizedKey] = {
      coordinator: unit?.coordonator || unit?.coordinator || '',
      coCoordinator: unit?.['co-coordonator'] || unit?.deputy_coordinator || '',
    };
  }
}

async function importSupportUnits(state) {
  const exists = await hasJson('departments', 'supportUnitsData.json');
  if (!exists) {
    console.warn('⚠️  supportUnitsData.json not found. Skipping support units import.');
    return;
  }
  const units = await readJson('departments', 'supportUnitsData.json');
  console.log(`\n⏳ Importing support units (${units.length} units detected)`);

  for (const unit of units) {
    const name = String(unit?.name || '').trim();
    if (!name) continue;

    const key = toKey(name);
    const paragraphs = extractParagraphs(unit?.description);
    const services = toFocusItems(unit?.elements);

    const existing = await findDocument('api::support-unit.support-unit', {
      name: { $eqi: name },
    });

    const baseData = {
      name,
      slug: toSlug(name),
      summary: paragraphs[0] || '',
      mission: paragraphs.join('\n\n'),
      body: toRichTextBlocks(paragraphs),
      services,
      contactLinks: unit?.contactLinks || [],
    };

    let supportDoc;
    if (existing) {
      supportDoc = await strapi
        .documents('api::support-unit.support-unit')
        .update({
          documentId: getDocumentId(existing),
          data: {
            ...baseData,
            publishedAt: nowISO(),
          },
        });
      await publishDocument('api::support-unit.support-unit', getDocumentId(supportDoc));
      console.log(`  🔁 updated support unit: ${name}`);
    } else {
      supportDoc = await strapi
        .documents('api::support-unit.support-unit')
        .create({
          data: {
            ...baseData,
            publishedAt: nowISO(),
          },
        });
      console.log(`  ✅ created support unit: ${name}`);
    }

    state.supportUnits[key] = supportDoc;
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
    const categoryKey = toKey(person?.category);
    const status = STATUS_MAP[person?.category] || STATUS_MAP[categoryKey] || 'researcher';

    if (state.peopleBySlug[slug] || state.peopleByKey[normalizedSlug]) {
      continue;
    }

    const existing = await findDocument('api::person.person', {
      slug: { $eqi: slug },
    });

    const departmentName = String(person?.department || '').trim();
    let departmentId = null;
    if (departmentName) {
      const departmentDoc =
        state.departments[toKey(departmentName)] ||
        (await findDocument('api::department.department', { name: { $eqi: departmentName } }));
      departmentId = getEntityId(departmentDoc);
    }

    const payload = {
      fullName,
      slug,
      status,
      titles: person?.title ? [person.title] : [],
      position: person?.title || '',
      phone: person?.phone || '',
      email: person?.email || '',
      publishedAt: nowISO(),
    };

    if (departmentId) {
      payload.department = { connect: [departmentId] };
    }

    let personDoc;
    if (existing) {
      personDoc = await strapi.documents('api::person.person').update({
        documentId: getDocumentId(existing),
        data: payload,
      });
      await publishDocument('api::person.person', getDocumentId(personDoc));
      console.log(`  🔁 updated person: ${fullName}`);
    } else {
      personDoc = await strapi.documents('api::person.person').create({
        data: payload,
      });
      await publishDocument('api::person.person', getDocumentId(personDoc));
      console.log(`  ✅ created person: ${fullName}`);
    }

    state.peopleBySlug[slug] = personDoc;
    state.peopleByKey[normalizedSlug] = personDoc;
    state.peopleByKey[toKey(fullName)] = personDoc;
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

async function ensureTheme(state, name) {
  const label = String(name || '').trim();
  if (!label) return null;
  const key = toKey(label);
  if (state.themes[key]) return state.themes[key];

  const slug = toSlug(label);
  const existing = await findDocument('api::research-theme.research-theme', {
    slug: { $eqi: slug },
  });

  if (existing) {
    if (!existing.publishedAt) {
      await publishDocument('api::research-theme.research-theme', getDocumentId(existing));
    }
    state.themes[key] = existing;
    return existing;
  }

  const created = await strapi.documents('api::research-theme.research-theme').create({
    data: {
      name: label,
      slug,
      summary: '',
      publishedAt: nowISO(),
    },
  });

  await publishDocument('api::research-theme.research-theme', getDocumentId(created));

  state.themes[key] = created;
  return created;
}

async function ensurePartner(state, name) {
  const label = String(name || '').trim();
  if (!label) return null;
  const key = toKey(label);
  if (state.partners[key]) return state.partners[key];

  const slug = toSlug(label);
  const existing = await findDocument('api::partner.partner', {
    slug: { $eqi: slug },
  });

  if (existing) {
    if (!existing.publishedAt) {
      await publishDocument('api::partner.partner', getDocumentId(existing));
    }
    state.partners[key] = existing;
    return existing;
  }

  const created = await strapi.documents('api::partner.partner').create({
    data: {
      name: label,
      slug,
      description: '',
      publishedAt: nowISO(),
    },
  });

  await publishDocument('api::partner.partner', getDocumentId(created));

  state.partners[key] = created;
  return created;
}

async function attachDepartmentLeads(state) {
  console.log('\n⏳ Linking department coordinators');

  for (const [key, meta] of Object.entries(state.departmentMeta)) {
    const department = state.departments[key];
    if (!department) continue;

    const data = {};
    const coordinatorDoc = lookupPerson(state, meta?.coordinator);
    const deputyDoc = lookupPerson(state, meta?.coCoordinator);

    if (coordinatorDoc) {
      const coordinatorId = getEntityId(coordinatorDoc);
      if (coordinatorId) data.coordinator = { connect: [coordinatorId] };
    }

    if (deputyDoc) {
      const deputyId = getEntityId(deputyDoc);
      if (deputyId) data.coCoordinator = { connect: [deputyId] };
    }

    if (!Object.keys(data).length) continue;

    await strapi.documents('api::department.department').update({
      documentId: getDocumentId(department),
      data,
    });
  }
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

    // continue with upsert to keep content published and in sync

    const departmentName = String(pub?.domain || '').trim();
    let departmentId = null;
    if (departmentName) {
      const departmentDoc =
        state.departments[toKey(departmentName)] ||
        (await findDocument('api::department.department', { name: { $eqi: departmentName } }));
      departmentId = getEntityId(departmentDoc);
    }

    const authorIds = [];
    const authorValues = Array.isArray(pub?.authors) ? pub.authors : [];
    for (const author of authorValues) {
      const authorDoc = lookupPerson(state, author);
      const id = getEntityId(authorDoc);
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

    let pubDoc;
    if (existing) {
      pubDoc = await strapi.documents('api::publication.publication').update({
        documentId: getDocumentId(existing),
        data: payload,
      });
      await publishDocument('api::publication.publication', getDocumentId(pubDoc));
      console.log(`  🔁 updated publication: ${title}`);
    } else {
      pubDoc = await strapi.documents('api::publication.publication').create({
        data: payload,
      });
      await publishDocument('api::publication.publication', getDocumentId(pubDoc));
      console.log(`  ✅ created publication: ${title}`);
    }

    state.publications[slug] = pubDoc;
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

    const domainNames = Array.isArray(proj?.domain) ? proj.domain : extractArray(proj?.domain);
    const domainIds = [];
    for (const name of domainNames) {
      const depDoc = state.departments[toKey(name)] || (await findDocument('api::department.department', { name: { $eqi: name } }));
      const id = getEntityId(depDoc);
      if (id) domainIds.push(id);
    }

    const memberDocs = Array.isArray(proj?.teams) ? proj.teams : [];
    const memberIds = [];
    const teamEntries = [];
    const seenTeam = new Set();
    for (const member of memberDocs) {
      const personDoc = lookupPerson(state, member?.name || member?.slug || member);
      const id = getEntityId(personDoc);
      if (id) memberIds.push(id);

      const role = extractString(member?.title || '').trim() || 'Member';
      if (id) {
        const teamKey = `${id}:${role}`;
        if (!seenTeam.has(teamKey)) {
          seenTeam.add(teamKey);
          teamEntries.push({
            person: id,
            role,
            isLead: false,
          });
        }
      }
    }

    const leadDoc = lookupPerson(state, proj?.lead);
    const leadId = getEntityId(leadDoc);

    if (leadId) {
      for (const entry of teamEntries) {
        if (entry.person === leadId) entry.isLead = true;
      }

      const hasLeadInTeam = teamEntries.some((entry) => entry.person === leadId);
      if (!hasLeadInTeam) {
        teamEntries.unshift({
          person: leadId,
          role: 'Lead',
          isLead: true,
        });
      }
    }

    const relatedPublicationTitle = String(proj?.publication || '').trim();
    const publicationSlug = relatedPublicationTitle ? toSlug(relatedPublicationTitle) : null;
    const publicationDoc = publicationSlug ? state.publications[publicationSlug] : null;
    const publicationId = getEntityId(publicationDoc);

    const partners = extractArray(proj?.partners).filter(Boolean);

    const themeIds = [];
    const themeNames = extractArray(proj?.themes);
    for (const themeName of themeNames) {
      const themeDoc = await ensureTheme(state, themeName);
      const id = getEntityId(themeDoc);
      if (id) themeIds.push(id);
    }

    const partnerIds = [];
    const partnerNames = partners.length ? partners : [];
    for (const partnerName of partnerNames) {
      const partnerDoc = await ensurePartner(state, partnerName);
      const id = getEntityId(partnerDoc);
      if (id) partnerIds.push(id);
    }

    const payload = {
      title,
      slug,
      abstract: proj?.abstract || '',
      status: proj?.status || 'ongoing',
      region: proj?.region || 'national',
      body: toRichTextBlocks(extractParagraphs(proj?.abstract)),
      docUrl: proj?.docUrl || proj?.doc_url || '',
      officialUrl: proj?.oficialUrl || proj?.officialUrl || '',
      publishedAt: nowISO(),
    };

    if (leadId) {
      payload.lead = { connect: [leadId] };
    }

    if (memberIds.length) {
      payload.members = { connect: Array.from(new Set(memberIds)) };
    }

    if (teamEntries.length) {
      payload.team = teamEntries;
    }

    if (domainIds.length) {
      payload.domains = { connect: domainIds };
    }

    if (publicationId) {
      payload.publications = { connect: [publicationId] };
    }

    if (themeIds.length) {
      payload.themes = { connect: themeIds };
    }

    if (partnerIds.length) {
      payload.partners = { connect: partnerIds };
    }

    let projectDoc;
    if (existing) {
      projectDoc = await strapi.documents('api::project.project').update({
        documentId: getDocumentId(existing),
        data: payload,
      });
      await publishDocument('api::project.project', getDocumentId(projectDoc));
      console.log(`  🔁 updated project: ${title}`);
    } else {
      projectDoc = await strapi.documents('api::project.project').create({
        data: payload,
      });
      await publishDocument('api::project.project', getDocumentId(projectDoc));
      console.log(`  ✅ created project: ${title}`);
    }

    state.projects[slug] = projectDoc;
  }
}

async function importNewsArticles(state) {
  const exists = await hasJson('news&events', 'newsData.json');
  if (!exists) {
    console.warn('⚠️  newsData.json not found. Skipping news import.');
    return;
  }

  const groups = await readJson('news&events', 'newsData.json');
  const allItems = [];
  for (const group of groups) {
    const title = String(group?.title || '').trim();
    const items = Array.isArray(group?.items) ? group.items : [];
    for (const item of items) {
      allItems.push({ groupTitle: title, ...item });
    }
  }

  console.log(`\n⏳ Importing news (${allItems.length} items detected)`);

  const categoryFromGroupTitle = (groupTitle) => {
    const key = toKey(groupTitle);
    if (key.includes('construction')) return 'construction';
    if (key.includes('award')) return 'award';
    if (key.includes('press') || key.includes('media')) return 'press';
    if (key.includes('collaboration') || key.includes('partner')) return 'collaboration';
    if (key.includes('announcement')) return 'announcement';
    return 'other';
  };

  const resolveWebPublicFile = (webPublicPath) => {
    const cleaned = String(webPublicPath || '').replace(/^\//, '');
    if (!cleaned) return null;
    return path.resolve(__dirname, '..', '..', 'web', 'public', cleaned);
  };

  for (const item of allItems) {
    const title = String(item?.text || '').trim();
    if (!title) continue;

    const slug = toSlug(title);
    const existing = await findDocument('api::news-article.news-article', {
      slug: { $eqi: slug },
    });

    const publishedDate = toISODate(item?.date);
    const category = categoryFromGroupTitle(item?.groupTitle || '');

    const heroImagePath = resolveWebPublicFile(item?.image);
    const heroImage = await ensureUploadedSingleImage(heroImagePath);

    const payload = {
      title,
      slug,
      summary: '',
      category,
      publishedDate,
      linkUrl: item?.url || '',
      body: [],
      publishedAt: nowISO(),
    };

    if (heroImage) {
      payload.heroImage = heroImage;
    }

    if (existing) {
      const updated = await strapi.documents('api::news-article.news-article').update({
        documentId: getDocumentId(existing),
        data: payload,
      });
      await publishDocument('api::news-article.news-article', getDocumentId(updated));
      console.log(`  🔁 updated news: ${title}`);
    } else {
      const created = await strapi.documents('api::news-article.news-article').create({
        data: payload,
      });
      await publishDocument('api::news-article.news-article', getDocumentId(created));
      console.log(`  ✅ created news: ${title}`);
    }
  }
}

async function importEvents(state) {
  const exists = await hasJson('news&events', 'eventsData.json');
  if (!exists) {
    console.warn('⚠️  eventsData.json not found. Skipping events import.');
    return;
  }

  const events = await readJson('news&events', 'eventsData.json');
  const list = Array.isArray(events) ? events : [];

  console.log(`\n⏳ Importing events (${list.length} items detected)`);

  for (const ev of list) {
    const title = String(ev?.title || '').trim();
    if (!title) continue;

    const slug = toSlug(title);
    const existing = await findDocument('api::event.event', {
      slug: { $eqi: slug },
    });

    const payload = {
      title,
      slug,
      description: '',
      category: 'event',
      ctaLabel: 'Open',
      ctaUrl: ev?.url || '',
      publishedAt: nowISO(),
    };

    if (existing) {
      const updated = await strapi.documents('api::event.event').update({
        documentId: getDocumentId(existing),
        data: payload,
      });
      await publishDocument('api::event.event', getDocumentId(updated));
      console.log(`  🔁 updated event: ${title}`);
    } else {
      const created = await strapi.documents('api::event.event').create({
        data: payload,
      });
      await publishDocument('api::event.event', getDocumentId(created));
      console.log(`  ✅ created event: ${title}`);
    }
  }
}

async function importSeminars(state) {
  const exists = await hasJson('news&events', 'seminarsData.json');
  if (!exists) {
    console.warn('⚠️  seminarsData.json not found. Skipping seminars import.');
    return;
  }

  const seminars = await readJson('news&events', 'seminarsData.json');
  const list = Array.isArray(seminars) ? seminars : [];

  console.log(`\n⏳ Importing seminars (${list.length} items detected)`);

  for (const s of list) {
    const title = String(s?.title || '').trim();
    if (!title) continue;

    const slug = toSlug(title);
    const existing = await findDocument('api::seminar.seminar', {
      slug: { $eqi: slug },
    });

    const about = extractParagraphs(s?.about);
    const moduleStrings = extractArray(s?.modules)
      .map((m) => (typeof m === 'string' ? m.trim() : String(m || '').trim()))
      .filter(Boolean);

    const payload = {
      title,
      slug,
      provider: '',
      summary: about.join('\n'),
      modules: moduleStrings.map((m) => ({
        title: m,
        description: '',
        richContent: '',
      })),
      ctaUrl: s?.url || '',
      ctaLabel: 'Open',
      body: toRichTextBlocks(about),
      tags: null,
      publishedAt: nowISO(),
    };

    if (existing) {
      const updated = await strapi.documents('api::seminar.seminar').update({
        documentId: getDocumentId(existing),
        data: payload,
      });
      await publishDocument('api::seminar.seminar', getDocumentId(updated));
      console.log(`  🔁 updated seminar: ${title}`);
    } else {
      const created = await strapi.documents('api::seminar.seminar').create({
        data: payload,
      });
      await publishDocument('api::seminar.seminar', getDocumentId(created));
      console.log(`  ✅ created seminar: ${title}`);
    }
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
    const ownerId = getEntityId(ownerDoc);

    if (!Array.isArray(owner?.elements) || !owner?.elements.length) continue;

    for (const dataset of owner.elements) {
      const title = String(dataset?.title || '').trim();
      if (!title) continue;

      const slug = toSlug(title);
      if (state.datasets[slug]) continue;

      const existing = await findDocument('api::dataset.dataset', {
        slug: { $eqi: slug },
      });

      const url = dataset?.url || dataset?.description;
      const payload = {
        title,
        slug,
        summary: dataset?.description
          ? String(dataset.description).trim().slice(0, 240)
          : '',
        description: extractString(dataset?.description),
        tags: dataset?.tags || null,
        source_url: url || '',
        platform: dataset?.platform || 'dataverse',
        publishedAt: nowISO(),
      };

      if (ownerId) {
        payload.authors = { connect: [ownerId] };
      }

      let datasetDoc;
      if (existing) {
        datasetDoc = await strapi.documents('api::dataset.dataset').update({
          documentId: getDocumentId(existing),
          data: payload,
        });
        await publishDocument('api::dataset.dataset', getDocumentId(datasetDoc));
        console.log(`  🔁 updated dataset: ${title}`);
      } else {
        datasetDoc = await strapi.documents('api::dataset.dataset').create({
          data: payload,
        });
        await publishDocument('api::dataset.dataset', getDocumentId(datasetDoc));
        console.log(`  ✅ created dataset: ${title}`);
      }

      state.datasets[slug] = datasetDoc;
    }
  }
}

async function runMigration() {
  const state = {
    departments: {},
    departmentsByName: {},
    departmentMeta: {},
    supportUnits: {},
    peopleBySlug: {},
    peopleByKey: {},
    publications: {},
    projects: {},
    datasets: {},
    themes: {},
    partners: {},
  };

  await importDepartments(state);
  await importSupportUnits(state);
  await importPeople(state);
  await attachDepartmentLeads(state);
  await importPublications(state);
  await importProjects(state);
  await importDatasets(state);
  await importNewsArticles(state);
  await importEvents(state);
  await importSeminars(state);

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

  try {
    await app.destroy();
  } catch (error) {
    console.warn('⚠️  Strapi teardown error (ignored):', error?.message || error);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
