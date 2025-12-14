const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://strapi:1337').replace(/\/$/, '');

const isServer = typeof window === 'undefined';

const toArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);

const stripHtml = (value) =>
  typeof value === 'string'
    ? value
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    : '';

const resolveMediaUrl = (media) => {
  if (!media) return '';

  const data = Array.isArray(media?.data) ? media.data[0] : media?.data ?? media;
  if (!data) return '';

  const url = data?.attributes?.url || data?.url;
  if (!url) return '';

  if (/^https?:\/\//i.test(url)) return url;
  return `${STRAPI_URL}${url.startsWith('/') ? url : `/${url}`}`;
};

const setPopulate = (params, baseKey, config = {}) => {
  params.set(baseKey, 'true');

  const fields = Array.isArray(config.fields) ? config.fields : [];
  fields
    .filter(Boolean)
    .forEach((field, index) => {
      params.append(`${baseKey}[fields][${index}]`, field);
    });

  const nestedPopulate = config.populate && typeof config.populate === 'object' ? config.populate : {};
  Object.entries(nestedPopulate).forEach(([relation, relationConfig]) => {
    setPopulate(params, `${baseKey}[populate][${relation}]`, relationConfig || {});
  });
};

const PERSON_FIELDS = ['fullName', 'slug', 'position', 'email', 'phone', 'type', 'location'];

const PERSON_FLAT_POPULATE = {
  fields: PERSON_FIELDS,
};

const PERSON_WITH_IMAGE_POPULATE = {
  fields: PERSON_FIELDS,
  populate: {
    portrait: {},
  },
};

const DEPARTMENT_POPULATE = {
  fields: ['name', 'slug', 'summary', 'description'],
};

const SUPPORT_UNIT_POPULATE = {
  fields: ['name', 'slug', 'summary', 'mission'],
};



const PUBLICATION_POPULATE = {
  fields: ['title', 'slug', 'year', 'kind', 'description', 'doc_url', 'external_url'],
  populate: {
    domain: DEPARTMENT_POPULATE,
    projects: {
      fields: ['title', 'slug'],
    },
    authors: PERSON_FLAT_POPULATE,
  },
};

const PROJECT_POPULATE = {
  fields: ['title', 'slug', 'abstract', 'region', 'status', 'docUrl', 'officialUrl', 'featured'],
  populate: {
    domains: DEPARTMENT_POPULATE,
    lead: PERSON_WITH_IMAGE_POPULATE,
    members: PERSON_WITH_IMAGE_POPULATE,
    themes: {
      fields: ['name', 'slug'],
    },
    partners: {
      fields: ['name', 'slug'],
    },
  },
};

const NEWS_ARTICLE_POPULATE = {
  fields: ['title', 'slug', 'summary', 'category', 'publishedDate', 'linkUrl'],
  populate: {
    heroImage: {},
    relatedDepartments: DEPARTMENT_POPULATE,
    relatedProjects: PROJECT_POPULATE,
    featuredPeople: PERSON_FLAT_POPULATE,
  },
};

// Map raw type/status values to human-friendly buckets used by the UI tabs
const STAFF_TYPE_LABELS = {
  staff: 'Staff',
  personal: 'Staff', // legacy name
  researcher: 'Researchers',
  research: 'Researchers',
  alumni: 'Alumni',
  alumnus: 'Alumni',
  visiting: 'Visiting Researchers',
  visitor: 'Visiting Researchers',
  'visiting researcher': 'Visiting Researchers',
  external: 'External',
  collaborator: 'External',
};

const normalizeStaffType = (value) => {
  const raw = value ?? '';
  const stringValue = typeof raw === 'string' ? raw.trim() : String(raw || '').trim();
  const key = stringValue.toLowerCase();
  return {
    key,
    label: STAFF_TYPE_LABELS[key] || '',
  };
};

/**
 * Helper function to make API calls to Strapi
 * @param {string} endpoint - The API endpoint (without /api prefix)
 * @param {object} options - Additional fetch options
 * @returns {Promise} - Parsed JSON response
 */
export async function fetchAPI(endpoint, options = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;

  // Server-only token. Do NOT use NEXT_PUBLIC_ prefix for this value.
  const token = process.env.STRAPI_API_TOKEN || null;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Only attach the token on the server to avoid exposing it to client bundles
  if (token && isServer) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      headers,
      ...options,
    });

    if (!response.ok) {
      // try to capture response body for better diagnostics
      let bodyText = '';
      try { bodyText = await response.text(); } catch (e) { /* ignore */ }
      throw new Error(`Strapi API call failed: ${response.status} ${response.statusText} - ${url} - ${bodyText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Strapi API Error:', {
      message: error.message,
      url,
      tokenAttached: !!(token && isServer),
      stack: error.stack,
    });

    // Return empty data structure instead of throwing to prevent crashes
    return { data: [], meta: {} };
  }
}

/**
 * Get all staff members from Strapi
 * @returns {Promise<Array>} Array of staff members
 */
export async function getStaff() {
  try {
    const params = new URLSearchParams();
    // Use fullName (camelCase) as defined in the schema
    params.set('sort', 'fullName:asc');
    params.append('fields[0]', 'fullName');
    params.append('fields[1]', 'slug');
    params.append('fields[2]', 'position');
    params.append('fields[3]', 'email');
    params.append('fields[4]', 'phone');
    params.append('fields[5]', 'type');
    params.append('fields[6]', 'location');
    params.append('fields[7]', 'bio');
    setPopulate(params, 'populate[department]', { fields: ['name', 'slug'] });
    setPopulate(params, 'populate[portrait]', { fields: ['url', 'formats', 'alternativeText'] });
    const data = await fetchAPI(`/people?${params.toString()}`);
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch staff:', error);
    return [];
  }
}

/**
 * Get a single staff member by slug
 * @param {string} slug - The staff member's slug
 * @returns {Promise<Object|null>} Staff member object or null
 */
export async function getStaffMember(slug) {
  try {
    if (!slug) return null;
    const params = new URLSearchParams();
    params.set('filters[slug][$eq]', slug);
    setPopulate(params, 'populate[department]', DEPARTMENT_POPULATE);
    setPopulate(params, 'populate[portrait]');
    setPopulate(params, 'populate[projects]', {
      fields: ['title', 'slug'],
    });
    setPopulate(params, 'populate[leading_projects]', {
      fields: ['title', 'slug'],
    });
    setPopulate(params, 'populate[publications]', {
      fields: ['title', 'slug', 'year'],
    });

    const data = await fetchAPI(`/people?${params.toString()}`);
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Failed to fetch staff member:', error);
    return null;
  }
}

/**
 * Get all projects from Strapi
 * @returns {Promise<Array>} Array of projects
 */
export async function getProjects() {
  try {
    const params = new URLSearchParams();
    params.set('sort', 'title:asc');
    setPopulate(params, 'populate[lead]', PERSON_WITH_IMAGE_POPULATE);
    setPopulate(params, 'populate[members]', PERSON_WITH_IMAGE_POPULATE);
    setPopulate(params, 'populate[domains]', DEPARTMENT_POPULATE);
    setPopulate(params, 'populate[themes]', { fields: ['name', 'slug'] });
    setPopulate(params, 'populate[partners]', { fields: ['name', 'slug'] });
    setPopulate(params, 'populate[publications]', { fields: ['title', 'slug', 'year'] });
    const data = await fetchAPI(`/projects?${params.toString()}`);
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

/**
 * Get a single project by slug
 * @param {string} slug - The project's slug
 * @returns {Promise<Object|null>} Project object or null
 */
export async function getProject(slug) {
  try {
    if (!slug) return null;
    const params = new URLSearchParams();
    params.set('filters[slug][$eq]', slug);
    setPopulate(params, 'populate[lead]', PERSON_WITH_IMAGE_POPULATE);
    setPopulate(params, 'populate[members]', PERSON_WITH_IMAGE_POPULATE);
    setPopulate(params, 'populate[domains]', DEPARTMENT_POPULATE);
    setPopulate(params, 'populate[themes]', { fields: ['name', 'slug'] });
    setPopulate(params, 'populate[partners]', { fields: ['name', 'slug'] });
    setPopulate(params, 'populate[publications]', { fields: ['title', 'slug', 'year'] });
    setPopulate(params, 'populate[heroImage]');
    setPopulate(params, 'populate[body]');
    const data = await fetchAPI(`/projects?${params.toString()}`);
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return null;
  }
}

/**
 * Get all publications from Strapi
 * @returns {Promise<Array>} Array of publications
 */
export async function getPublications() {
  try {
    const params = new URLSearchParams();
    params.set('sort', 'year:desc');
    setPopulate(params, 'populate[authors]', PERSON_FLAT_POPULATE);
    setPopulate(params, 'populate[projects]', {
      fields: ['title', 'slug'],
      populate: {
        lead: PERSON_FLAT_POPULATE,
        domains: DEPARTMENT_POPULATE,
      },
    });
    setPopulate(params, 'populate[domain]', DEPARTMENT_POPULATE);
    const data = await fetchAPI(`/publications?${params.toString()}`);
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch publications:', error);
    return [];
  }
}

/**
 * Get all news articles from Strapi
 * @returns {Promise<Array>} Array of news articles
 */
export async function getNewsArticles() {
  try {
    const params = new URLSearchParams();
    params.set('sort', 'publishedDate:desc');
    setPopulate(params, 'populate', NEWS_ARTICLE_POPULATE);
    const data = await fetchAPI(`/news-articles?${params.toString()}`);
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch news articles:', error);
    return [];
  }
}

/**
 * Get publications by author slug
 * @param {string} authorSlug - The author's slug
 * @returns {Promise<Array>} Array of publications by the author
 */
export async function getPublicationsByAuthor(authorSlug) {
  try {
    if (!authorSlug) return [];
    const params = new URLSearchParams();
    params.set('filters[authors][slug][$eq]', authorSlug);
    params.set('sort', 'year:desc');
    setPopulate(params, 'populate[authors]', PERSON_FLAT_POPULATE);
    setPopulate(params, 'populate[projects]', {
      fields: ['title', 'slug'],
      populate: {
        lead: PERSON_FLAT_POPULATE,
        domains: DEPARTMENT_POPULATE,
      },
    });
    setPopulate(params, 'populate[domain]', DEPARTMENT_POPULATE);
    const data = await fetchAPI(`/publications?${params.toString()}`);
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch publications by author:', error);
    return [];
  }
}

/**
 * Get projects by staff member slug
 * @param {string} memberSlug - The staff member's slug
 * @returns {Promise<Array>} Array of projects associated with the staff member
 */
export async function getProjectsByMember(memberSlug) {
  try {
    if (!memberSlug) return [];
    const params = new URLSearchParams();
    params.set('sort', 'title:asc');
    params.set('filters[$or][0][lead][slug][$eq]', memberSlug);
    params.set('filters[$or][1][members][slug][$eq]', memberSlug);
    setPopulate(params, 'populate[lead]', PERSON_WITH_IMAGE_POPULATE);
    setPopulate(params, 'populate[members]', PERSON_WITH_IMAGE_POPULATE);
    setPopulate(params, 'populate[domains]', DEPARTMENT_POPULATE);
    setPopulate(params, 'populate[publications]', PUBLICATION_POPULATE);
    const data = await fetchAPI(`/projects?${params.toString()}`);
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch projects by member:', error);
    return [];
  }
}

export async function getDepartments() {
  try {
    const params = new URLSearchParams();
    params.set('sort', 'name:asc');
    params.append('fields[0]', 'name');
    params.append('fields[1]', 'slug');
    params.append('fields[2]', 'summary');
    params.append('fields[3]', 'description');
    setPopulate(params, 'populate[focusItems]');
    setPopulate(params, 'populate[contactLinks]');
    setPopulate(params, 'populate[body]');
    setPopulate(params, 'populate[heroImage]');
    setPopulate(params, 'populate[coordinator]', PERSON_FLAT_POPULATE);
    setPopulate(params, 'populate[coCoordinator]', PERSON_FLAT_POPULATE);
    const data = await fetchAPI(`/departments?${params.toString()}`);
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch departments:', error);
    return [];
  }
}

export async function getSupportUnits() {
  try {
    const params = new URLSearchParams();
    params.set('sort', 'name:asc');
    params.append('fields[0]', 'name');
    params.append('fields[1]', 'slug');
    params.append('fields[2]', 'summary');
    params.append('fields[3]', 'mission');
    setPopulate(params, 'populate[services]');
    setPopulate(params, 'populate[contactLinks]');
    setPopulate(params, 'populate[body]');
    setPopulate(params, 'populate[heroImage]');
    setPopulate(params, 'populate[lead]', PERSON_FLAT_POPULATE);
    setPopulate(params, 'populate[members]', PERSON_FLAT_POPULATE);
    const data = await fetchAPI(`/support-units?${params.toString()}`);
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch support units:', error);
    return [];
  }
}

/**
 * Helper function to transform Strapi data structure to match current app structure
 * This helps reduce the changes needed in existing components
 */
export function transformStaffData(strapiStaff) {
  const list = Array.isArray(strapiStaff) ? strapiStaff : strapiStaff ? [strapiStaff] : [];

  return list.map((person) => {
    // Strapi 5 returns flat objects, Strapi 4 had attributes wrapper
    const attributes = person?.attributes ?? person ?? {};
    const { key: typeKey, label: typeLabel } = normalizeStaffType(
      attributes.type ?? attributes.status ?? attributes.category ?? attributes.role ?? ''
    );
    // Strapi 5: department is direct object, Strapi 4: department.data
    const departmentEntry = attributes.department?.data ?? attributes.department;
    const departmentAttributes = departmentEntry?.attributes ?? departmentEntry ?? {};

    const department = departmentEntry
      ? {
          id: departmentEntry.id,
          slug: departmentAttributes.slug || '',
          name: departmentAttributes.name || '',
          description: stripHtml(
            departmentAttributes.description ||
              departmentAttributes.markdown ||
              departmentAttributes.content ||
              ''
          ),
        }
      : null;

    const leadingProjects = toArray(attributes.leading_projects?.data ?? attributes.leading_projects).map((project) => {
      const proj = project?.attributes ?? project ?? {};
      return {
        id: project?.id ?? null,
        slug: proj.slug || '',
        title: proj.title || '',
      };
    });

    const memberProjects = toArray(attributes.projects?.data ?? attributes.projects).map((project) => {
      const proj = project?.attributes ?? project ?? {};
      return {
        id: project?.id ?? null,
        slug: proj.slug || '',
        title: proj.title || '',
      };
    });

    const publications = toArray(attributes.publications?.data ?? attributes.publications).map((pub) => {
      const pubData = pub?.attributes ?? pub ?? {};
      return {
        id: pub?.id ?? null,
        slug: pubData.slug || '',
        title: pubData.title || '',
        year: pubData.year ?? null,
      };
    });

    // Use 'portrait' field from schema
    const image = resolveMediaUrl(attributes.portrait) || attributes.portrait || '';

    return {
      id: person?.id ?? null,
      slug: attributes.slug || '',
      // Map fullName (schema) to name (frontend)
      name: attributes.fullName || attributes.name || '',
      // Map position (schema) to title (frontend)
      title: attributes.position || attributes.title || '',
      phone: attributes.phone || '',
      email: attributes.email || '',
      type: typeKey,
      role: typeKey || attributes.role || '',
      category: typeLabel || typeKey || '',
      department: department?.name || '',
      departmentInfo: department,
      image,
      bio: stripHtml(attributes.bio) || '',
      leadingProjects,
      memberProjects,
      publications,
      _strapi: person,
    };
  });
}

export function groupStaffByType(staffList) {
  const list = Array.isArray(staffList) ? staffList : staffList ? [staffList] : [];

  return list.reduce((acc, person) => {
    const { key, label } = normalizeStaffType(
      person?.type ?? person?.role ?? person?.category ?? person?.status ?? ''
    );

    const bucket = label || STAFF_TYPE_LABELS[key] || 'Other';
    if (!acc[bucket]) acc[bucket] = [];
    acc[bucket].push(person);
    return acc;
  }, {});
}

/**
 * Helper function to transform publication data
 */
export function transformPublicationData(strapiPubs) {
  const list = Array.isArray(strapiPubs) ? strapiPubs : strapiPubs ? [strapiPubs] : [];

  return list.map((pub) => {
    const attributes = pub?.attributes ?? pub ?? {};

    const authors = toArray(attributes.authors?.data ?? attributes.authors).map((author) => {
      const authorData = author?.attributes ?? author ?? {};
      return {
        id: author?.id ?? null,
        slug: authorData.slug || '',
        // Map fullName (schema) to name (frontend)
        name: authorData.fullName || authorData.name || '',
      };
    });

    const projects = toArray(attributes.projects?.data ?? attributes.projects).map((project) => {
      const projectData = project?.attributes ?? project ?? {};
      return {
        id: project?.id ?? null,
        slug: projectData.slug || '',
        title: projectData.title || '',
      };
    });

    const domainEntry = attributes.domain?.data ?? attributes.domain;
    const domainData = domainEntry?.attributes ?? domainEntry ?? {};
    const domain = domainData.name || (typeof attributes.domain === 'string' ? attributes.domain : '');

    return {
      id: pub?.id ?? null,
      slug: attributes.slug || '',
      title: attributes.title || '',
      year: attributes.year ?? null,
      domain,
      kind: attributes.kind || '',
      description: stripHtml(attributes.description) || '',
      authors,
      docUrl: attributes.doc_url || attributes.docUrl || attributes.external_url || attributes.externalUrl || '',
      projects,
      _strapi: pub,
    };
  });
}

export function transformNewsData(strapiNews) {
  const list = Array.isArray(strapiNews) ? strapiNews : strapiNews ? [strapiNews] : [];

  const normalizeDate = (value) => {
    if (!value) return null;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    return {
      day: d.getUTCDate(),
      month: d.getUTCMonth() + 1,
      year: d.getUTCFullYear(),
    };
  };

  const items = list.map((item) => {
    const attributes = item?.attributes ?? item ?? {};
    return {
      id: item?.id ?? null,
      title: attributes.title || '',
      slug: attributes.slug || '',
      summary: attributes.summary || '',
      category: attributes.category || 'other',
      date: normalizeDate(attributes.publishedDate),
      linkUrl: attributes.linkUrl || '',
      image: resolveMediaUrl(attributes.heroImage),
      _strapi: item,
    };
  });

  // Group by category to preserve the existing UI structure
  const byCategory = items.reduce((acc, item) => {
    const key = item.category || 'other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const categoryLabel = (cat) => {
    const map = {
      announcement: 'Announcements',
      construction: 'Construction',
      collaboration: 'Collaborations',
      award: 'Awards',
      press: 'Press',
      other: 'Other',
    };
    return map[cat] || 'Other';
  };

  return Object.entries(byCategory)
    .map(([cat, list]) => ({
      title: categoryLabel(cat),
      items: list.map((n) => ({
        text: n.title,
        url: n.linkUrl || '#',
        date: n.date || { day: null, month: null, year: null },
        image: n.image,
      })),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Helper function to transform project data
 */
export function transformProjectData(strapiProjects) {
  const list = Array.isArray(strapiProjects) ? strapiProjects : strapiProjects ? [strapiProjects] : [];

  return list.map((project) => {
    const attributes = project?.attributes ?? project ?? {};

    const domains = toArray(attributes.domains?.data ?? attributes.domains).map((department) => {
      const deptData = department?.attributes ?? department ?? {};
      return {
        id: department?.id ?? null,
        slug: deptData.slug || '',
        name: deptData.name || '',
      };
    });

    const themes = toArray(attributes.themes?.data ?? attributes.themes).map((theme) => {
      const themeData = theme?.attributes ?? theme ?? {};
      return {
        id: theme?.id ?? null,
        slug: themeData.slug || '',
        name: themeData.name || '',
      };
    });

    const partners = toArray(attributes.partners?.data ?? attributes.partners).map((partner) => {
      const partnerData = partner?.attributes ?? partner ?? {};
      return {
        id: partner?.id ?? null,
        slug: partnerData.slug || '',
        name: partnerData.name || '',
      };
    });

    const members = toArray(attributes.members?.data ?? attributes.members).map((member) => {
      const memberAttr = member?.attributes ?? member ?? {};
      const image = resolveMediaUrl(memberAttr.portrait) || memberAttr.portrait || '';
      return {
        id: member?.id ?? null,
        slug: memberAttr.slug || '',
        // Map fullName (schema) to name (frontend)
        name: memberAttr.fullName || memberAttr.name || '',
        // Map position (schema) to title (frontend)
        title: memberAttr.position || memberAttr.title || '',
        email: memberAttr.email || '',
        phone: memberAttr.phone || '',
        image,
      };
    });

    const publications = toArray(attributes.publications?.data ?? attributes.publications).map((pub) => {
      const pubData = pub?.attributes ?? pub ?? {};
      return {
        id: pub?.id ?? null,
        slug: pubData.slug || '',
        title: pubData.title || '',
        year: pubData.year ?? null,
      };
    });

    const leadEntry = attributes.lead?.data ?? attributes.lead;
    const leadAttr = leadEntry?.attributes ?? leadEntry ?? {};
    const leadDetails = leadEntry
      ? {
          id: leadEntry.id ?? null,
          slug: leadAttr.slug || '',
          // Map fullName (schema) to name (frontend)
          name: leadAttr.fullName || leadAttr.name || '',
          // Map position (schema) to title (frontend)
          title: leadAttr.position || leadAttr.title || '',
          email: leadAttr.email || '',
          phone: leadAttr.phone || '',
          image: resolveMediaUrl(leadAttr.portrait) || leadAttr.portrait || '',
        }
      : typeof attributes.lead === 'string' && attributes.lead.trim().length
      ? {
          id: null,
          slug: '',
          name: attributes.lead.trim(),
          title: '',
          email: '',
          phone: '',
          image: '',
        }
      : null;

    const leadName = leadDetails?.name || '';
    const leadSlug = leadDetails?.slug || '';

    return {
      id: project?.id ?? null,
      slug: attributes.slug || '',
      title: attributes.title || '',
      abstract: attributes.abstract || '',
      // Map themes relation to simple array for frontend compatibility
      themes: themes.map(t => t.name).filter(Boolean),
      // Map partners relation to simple array for frontend compatibility
      partners: partners.map(p => p.name).filter(Boolean),
      themesData: themes,
      partnersData: partners,
      region: attributes.region || '',
      domains,
      domain: domains.map((d) => d.name).filter(Boolean),
      members,
      publications,
      lead: leadName,
      leadName,
      leadSlug,
      leadDetails,
      // Map docUrl (schema) to docUrl (frontend)
      docUrl: attributes.docUrl || attributes.doc_url || '',
      // Map officialUrl (schema) to oficialUrl (legacy frontend typo)
      oficialUrl: attributes.officialUrl || attributes.oficial_url || attributes.official_url || '',
      teams: members.map((member) => ({ name: member.slug, title: member.title, fullName: member.name })),
      _strapi: project,
    };
  });
}

export function transformDepartmentData(strapiDepartments) {
  const list = Array.isArray(strapiDepartments)
    ? strapiDepartments
    : strapiDepartments
    ? [strapiDepartments]
    : [];

  const normalizeFocusItems = (items) =>
    Array.isArray(items)
      ? items
          .map((item) => {
            if (!item) return null;
            const title =
              item?.title || item?.heading || item?.text || item?.label || 'Details';
            const description = stripHtml(item?.description || item?.content || item?.body || '');
            const content = description ? [description] : [];
            return {
              text: title,
              content,
              raw: item,
            };
          })
          .filter(Boolean)
      : [];

  return list.map((department) => {
    const attributes = department?.attributes ?? department ?? {};
    const coordinatorEntry = attributes.coordinator?.data ?? attributes.coordinator;
    const coCoordinatorEntry = attributes.coCoordinator?.data ?? attributes.coCoordinator;
    const coordinatorData = coordinatorEntry?.attributes ?? coordinatorEntry ?? {};
    const coCoordinatorData = coCoordinatorEntry?.attributes ?? coCoordinatorEntry ?? {};

    const coordinator =
      coordinatorData.fullName ||
      coordinatorData.name ||
      (typeof attributes.coordinator === 'string' ? attributes.coordinator : '') ||
      '';
    const coCoordinator =
      coCoordinatorData.fullName ||
      coCoordinatorData.name ||
      (typeof attributes.coCoordinator === 'string' ? attributes.coCoordinator : '') ||
      '';

    const elements = normalizeFocusItems(attributes.focusItems);
    const contactLinks = Array.isArray(attributes.contactLinks)
      ? attributes.contactLinks.map((link) => ({
          label: link?.label || link?.title || link?.text || 'Contact',
          url: link?.url || link?.href || '',
          icon: link?.icon || '',
        }))
      : [];

    return {
      id: department?.id ?? null,
      name: attributes.name || '',
      slug: attributes.slug || '',
      summary: attributes.summary || '',
      description:
        typeof attributes.description === 'string'
          ? stripHtml(attributes.description)
          : stripHtml(attributes.description?.toString?.() || ''),
      rawDescription: attributes.description || '',
      body: attributes.body || [],
      elements,
      contactLinks,
      icon: '🏷️', // Default icon since schema doesn't have icon field
      coordinator,
      coCoordinator,
      focusItems: elements,
      coCoordinatorSlug: coCoordinatorData.slug || '',
      coordinatorSlug: coordinatorData.slug || '',
      _strapi: department,
    };
  });
}

export function transformSupportUnitData(strapiSupportUnits) {
  const list = Array.isArray(strapiSupportUnits)
    ? strapiSupportUnits
    : strapiSupportUnits
    ? [strapiSupportUnits]
    : [];

  const normalizeServices = (items) =>
    Array.isArray(items)
      ? items
          .map((item) => {
            if (!item) return null;
            const title = item?.title || item?.heading || item?.text || item?.label || 'Details';
            const description = stripHtml(item?.description || item?.content || item?.body || '');
            const content = description ? [description] : [];
            return {
              text: title,
              content,
              raw: item,
            };
          })
          .filter(Boolean)
      : [];

  return list.map((unit) => {
    const attributes = unit?.attributes ?? unit ?? {};
    const leadEntry = attributes.lead?.data ?? attributes.lead;
    const leadData = leadEntry?.attributes ?? leadEntry ?? {};
    const members = toArray(attributes.members?.data ?? attributes.members).map((member) => {
      const memberData = member?.attributes ?? member ?? {};
      return {
        id: member?.id ?? null,
        slug: memberData.slug || '',
        name: memberData.fullName || memberData.name || '',
        title: memberData.position || memberData.title || '',
        email: memberData.email || '',
        phone: memberData.phone || '',
      };
    });

    const services = normalizeServices(attributes.services);
    const contactLinks = Array.isArray(attributes.contactLinks)
      ? attributes.contactLinks.map((link) => ({
          label: link?.label || link?.title || link?.text || 'Contact',
          url: link?.url || link?.href || '',
          icon: link?.icon || '',
        }))
      : [];

    return {
      id: unit?.id ?? null,
      name: attributes.name || '',
      slug: attributes.slug || '',
      summary: attributes.summary || '',
      description: stripHtml(attributes.mission) || stripHtml(attributes.summary) || '',
      rawDescription: attributes.mission || attributes.summary || '',
      body: attributes.body || [],
      elements: services,
      contactLinks,
      icon: '🏷️',
      coordinator: leadData.fullName || leadData.name || '',
      coCoordinator: '',
      focusItems: services,
      coCoordinatorSlug: '',
      coordinatorSlug: leadData.slug || '',
      members,
      _strapi: unit,
    };
  });
}