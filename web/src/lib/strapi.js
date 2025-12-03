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

const PERSON_FIELDS = ['full_name', 'slug', 'title', 'email', 'phone'];

const PERSON_FLAT_POPULATE = {
  fields: PERSON_FIELDS,
};

const PERSON_WITH_IMAGE_POPULATE = {
  fields: PERSON_FIELDS,
  populate: {
    image: {},
  },
};

const DEPARTMENT_POPULATE = {
  fields: ['name', 'slug', 'summary', 'description', 'icon'],
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
  fields: ['title', 'slug', 'abstract', 'region', 'themes', 'partners', 'doc_url', 'official_url'],
  populate: {
    domains: DEPARTMENT_POPULATE,
    lead: PERSON_WITH_IMAGE_POPULATE,
    members: PERSON_WITH_IMAGE_POPULATE,
    publications: PUBLICATION_POPULATE,
  },
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
    // The person content-type uses `full_name` as the field, not `name`.
    const params = new URLSearchParams();
    params.set('sort', 'full_name:asc');
    params.append('fields[0]', 'full_name');
    params.append('fields[1]', 'slug');
    params.append('fields[2]', 'title');
    params.append('fields[3]', 'email');
    params.append('fields[4]', 'phone');
    params.append('fields[5]', 'role');
    params.append('fields[6]', 'category');
    params.append('fields[7]', 'bio');
    setPopulate(params, 'populate[department]', { fields: ['name', 'slug'] });
    setPopulate(params, 'populate[image]', { fields: ['url', 'formats', 'alternativeText'] });
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
    // Single person lookup - collection is `people` in Strapi
    const params = new URLSearchParams();
    params.set('filters[slug][$eq]', slug);
    setPopulate(params, 'populate[department]', DEPARTMENT_POPULATE);
    setPopulate(params, 'populate[image]');
    setPopulate(params, 'populate[projects]', PROJECT_POPULATE);
    setPopulate(params, 'populate[leading_projects]', PROJECT_POPULATE);
    setPopulate(params, 'populate[publications]', PUBLICATION_POPULATE);

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
    setPopulate(params, 'populate[publications]', PUBLICATION_POPULATE);
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
    setPopulate(params, 'populate[publications]', PUBLICATION_POPULATE);
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
    params.append('fields[4]', 'icon');
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

/**
 * Helper function to transform Strapi data structure to match current app structure
 * This helps reduce the changes needed in existing components
 */
export function transformStaffData(strapiStaff) {
  const list = Array.isArray(strapiStaff) ? strapiStaff : strapiStaff ? [strapiStaff] : [];

  return list.map((person) => {
    const attributes = person?.attributes ?? {};
    const departmentEntry = attributes.department?.data;
    const departmentAttributes = departmentEntry?.attributes ?? {};

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

    const leadingProjects = toArray(attributes.leading_projects?.data).map((project) => ({
      id: project?.id ?? null,
      slug: project?.attributes?.slug || '',
      title: project?.attributes?.title || '',
    }));

    const memberProjects = toArray(attributes.projects?.data).map((project) => ({
      id: project?.id ?? null,
      slug: project?.attributes?.slug || '',
      title: project?.attributes?.title || '',
    }));

    const publications = toArray(attributes.publications?.data).map((pub) => ({
      id: pub?.id ?? null,
      slug: pub?.attributes?.slug || '',
      title: pub?.attributes?.title || '',
      year: pub?.attributes?.year ?? null,
    }));

    const image = resolveMediaUrl(attributes.image) || attributes.image || '';

    return {
      id: person?.id ?? null,
      slug: attributes.slug || '',
      name: attributes.full_name || attributes.name || '',
      title: attributes.title || '',
      phone: attributes.phone || '',
      email: attributes.email || '',
      role: attributes.role || '',
      category: attributes.category || '',
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

/**
 * Helper function to transform publication data
 */
export function transformPublicationData(strapiPubs) {
  const list = Array.isArray(strapiPubs) ? strapiPubs : strapiPubs ? [strapiPubs] : [];

  return list.map((pub) => {
    const attributes = pub?.attributes ?? {};

    const authors = toArray(attributes.authors?.data).map((author) => ({
      id: author?.id ?? null,
      slug: author?.attributes?.slug || '',
      name: author?.attributes?.full_name || author?.attributes?.name || '',
    }));

    const projects = toArray(attributes.projects?.data).map((project) => ({
      id: project?.id ?? null,
      slug: project?.attributes?.slug || '',
      title: project?.attributes?.title || '',
    }));

    const domainEntry = attributes.domain?.data;
    const domain = domainEntry?.attributes?.name || attributes.domain || '';

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

/**
 * Helper function to transform project data
 */
export function transformProjectData(strapiProjects) {
  const list = Array.isArray(strapiProjects) ? strapiProjects : strapiProjects ? [strapiProjects] : [];

  return list.map((project) => {
    const attributes = project?.attributes ?? {};

    const domains = toArray(attributes.domains?.data).map((department) => ({
      id: department?.id ?? null,
      slug: department?.attributes?.slug || '',
      name: department?.attributes?.name || '',
    }));

    const members = toArray(attributes.members?.data).map((member) => {
      const memberAttr = member?.attributes ?? {};
      const image = resolveMediaUrl(memberAttr.image) || memberAttr.image || '';
      return {
        id: member?.id ?? null,
        slug: memberAttr.slug || '',
        name: memberAttr.full_name || memberAttr.name || '',
        title: memberAttr.title || '',
        email: memberAttr.email || '',
        phone: memberAttr.phone || '',
        image,
      };
    });

    const publications = toArray(attributes.publications?.data).map((pub) => ({
      id: pub?.id ?? null,
      slug: pub?.attributes?.slug || '',
      title: pub?.attributes?.title || '',
      year: pub?.attributes?.year ?? null,
    }));

    const leadEntry = attributes.lead?.data;
    const leadAttr = leadEntry?.attributes ?? {};
    const leadDetails = leadEntry
      ? {
          id: leadEntry.id ?? null,
          slug: leadAttr.slug || '',
          name: leadAttr.full_name || leadAttr.name || '',
          title: leadAttr.title || '',
          email: leadAttr.email || '',
          phone: leadAttr.phone || '',
          image: resolveMediaUrl(leadAttr.image) || leadAttr.image || '',
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
      themes: Array.isArray(attributes.themes) ? attributes.themes : toArray(attributes.themes),
      partners: Array.isArray(attributes.partners) ? attributes.partners : toArray(attributes.partners),
      region: attributes.region || '',
      domains,
      domain: domains.map((d) => d.name).filter(Boolean),
      members,
      publications,
      lead: leadName,
      leadName,
      leadSlug,
      leadDetails,
      docUrl: attributes.doc_url || attributes.docUrl || '',
      oficialUrl: attributes.official_url || attributes.oficialUrl || attributes.officialUrl || '',
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
    const attributes = department?.attributes ?? {};
    const coordinatorEntry = attributes.coordinator?.data;
    const coCoordinatorEntry = attributes.coCoordinator?.data;

    const coordinator =
      coordinatorEntry?.attributes?.full_name ||
      coordinatorEntry?.attributes?.name ||
      attributes.coordinator ||
      '';
    const coCoordinator =
      coCoordinatorEntry?.attributes?.full_name ||
      coCoordinatorEntry?.attributes?.name ||
      attributes.coCoordinator ||
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
      icon: attributes.icon || '🏷️',
      coordinator,
      coCoordinator,
      focusItems: elements,
      coCoordinatorSlug: coCoordinatorEntry?.attributes?.slug || '',
      coordinatorSlug: coordinatorEntry?.attributes?.slug || '',
      _strapi: department,
    };
  });
}