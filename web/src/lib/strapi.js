const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Helper function to make API calls to Strapi
 * @param {string} endpoint - The API endpoint (without /api prefix)
 * @param {object} options - Additional fetch options
 * @returns {Promise} - Parsed JSON response
 */
export async function fetchAPI(endpoint, options = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`Strapi API call failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Strapi API Error:', error);
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
    const data = await fetchAPI('/staff?populate=*&sort=name:asc');
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
    const data = await fetchAPI(`/staff?filters[slug][$eq]=${slug}&populate=*`);
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
    const data = await fetchAPI('/projects?populate=*&sort=title:asc');
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
    const data = await fetchAPI(`/projects?filters[slug][$eq]=${slug}&populate=*`);
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
    const data = await fetchAPI('/publications?populate=*&sort=year:desc');
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
    const data = await fetchAPI(`/publications?filters[authors][$contains]=${authorSlug}&populate=*&sort=year:desc`);
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
    const data = await fetchAPI(`/projects?filters[$or][0][lead][$contains]=${memberSlug}&filters[$or][1][members][$contains]=${memberSlug}&populate=*&sort=title:asc`);
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch projects by member:', error);
    return [];
  }
}

/**
 * Helper function to transform Strapi data structure to match current app structure
 * This helps reduce the changes needed in existing components
 */
export function transformStaffData(strapiStaff) {
  if (!Array.isArray(strapiStaff)) return [];
  
  return strapiStaff.map(person => ({
    id: person.id,
    slug: person.attributes?.slug || '',
    name: person.attributes?.name || '',
    title: person.attributes?.title || '',
    phone: person.attributes?.phone || '',
    email: person.attributes?.email || '',
    department: person.attributes?.department || '',
    image: person.attributes?.image?.data?.attributes?.url || person.attributes?.image || '',
    bio: person.attributes?.bio || '',
    // Keep original Strapi structure for advanced usage
    _strapi: person
  }));
}

/**
 * Helper function to transform publication data
 */
export function transformPublicationData(strapiPubs) {
  if (!Array.isArray(strapiPubs)) return [];
  
  return strapiPubs.map(pub => ({
    id: pub.id,
    title: pub.attributes?.title || '',
    year: pub.attributes?.year || new Date().getFullYear(),
    domain: pub.attributes?.domain || '',
    kind: pub.attributes?.kind || '',
    description: pub.attributes?.description || '',
    authors: pub.attributes?.authors || [],
    docUrl: pub.attributes?.docUrl || '',
    // Keep original Strapi structure
    _strapi: pub
  }));
}

/**
 * Helper function to transform project data
 */
export function transformProjectData(strapiProjects) {
  if (!Array.isArray(strapiProjects)) return [];
  
  return strapiProjects.map(project => ({
    id: project.id,
    title: project.attributes?.title || '',
    lead: project.attributes?.lead || '',
    abstract: project.attributes?.abstract || '',
    themes: project.attributes?.themes || [],
    teams: project.attributes?.teams || [],
    region: project.attributes?.region || '',
    domain: project.attributes?.domain || [],
    partners: project.attributes?.partners || [],
    docUrl: project.attributes?.docUrl || '',
    oficialUrl: project.attributes?.oficialUrl || '',
    // Keep original Strapi structure
    _strapi: project
  }));
}