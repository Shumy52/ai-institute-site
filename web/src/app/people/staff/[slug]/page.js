import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStaffMember, getPublicationsByAuthor, getProjectsByMember } from "@/lib/strapi";
import { allStaff } from "@/app/data/staffData";
import { getPublicationsByAuthor as getStaticPubs } from "@/app/data/pubData";
import { getProjectsByMember as getStaticProjects } from "@/app/data/proData";
import StaffDetailClient from "./StaffDetailClient";

export default async function StaffDetailPage({ params }) {
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  
  if (!slug) {
    notFound();
  }

  let person = null;
  let publications = [];
  let projects = [];

  // Try to get data from Strapi first
  try {
    const strapiPerson = await getStaffMember(slug);
    if (strapiPerson) {
      person = {
        id: strapiPerson.id,
        slug: strapiPerson.attributes?.slug || slug,
        name: strapiPerson.attributes?.name || '',
        title: strapiPerson.attributes?.title || '',
        phone: strapiPerson.attributes?.phone || '',
        email: strapiPerson.attributes?.email || '',
        department: strapiPerson.attributes?.department || '',
        image: strapiPerson.attributes?.image?.data?.attributes?.url || strapiPerson.attributes?.image || '',
        bio: strapiPerson.attributes?.bio || '',
      };

      // Get publications and projects from Strapi
      const strapiPubs = await getPublicationsByAuthor(slug);
      const strapiProjects = await getProjectsByMember(slug);

      publications = strapiPubs.map(pub => ({
        id: pub.id,
        title: pub.attributes?.title || '',
        year: pub.attributes?.year || new Date().getFullYear(),
        domain: pub.attributes?.domain || '',
        kind: pub.attributes?.kind || '',
        description: pub.attributes?.description || '',
        authors: pub.attributes?.authors || [],
        docUrl: pub.attributes?.docUrl || '',
      }));

      projects = strapiProjects.map(project => ({
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
      }));
    }
  } catch (error) {
    console.warn('Failed to fetch from Strapi, falling back to static data:', error);
  }

  // Fallback to static data if Strapi data not available
  if (!person) {
    person = allStaff.find((p) => p.slug === slug);
    if (!person) {
      notFound();
    }

    // Get static publications and projects
    publications = getStaticPubs(slug);
    projects = getStaticProjects(slug);
  }

  return (
    <main className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative w-36 h-36 mx-auto mb-4">
          <Image
            src={person.image || "/people/Basic_avatar_image.png"}
            alt={person.name}
            fill
            sizes="144px"
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">
          {person.name}
        </h1>
        {person.title && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            {person.title}
          </p>
        )}
        {person.department && (
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Department: {person.department}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          {person.email && (
            <a 
              href={`mailto:${person.email}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              📧 {person.email}
            </a>
          )}
          {person.phone && (
            <span className="text-gray-600 dark:text-gray-400">
              📞 {person.phone}
            </span>
          )}
        </div>
        {person.bio && (
          <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl">
            {person.bio}
          </p>
        )}
      </div>

      <StaffDetailClient 
        person={person} 
        publications={publications} 
        projects={projects}
        slug={slug}
      />
    </main>
  );
}
