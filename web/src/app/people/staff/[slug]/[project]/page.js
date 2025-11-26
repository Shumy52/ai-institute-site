import { notFound } from "next/navigation";
import {
  getProject,
  getStaffMember,
  transformProjectData,
  transformPublicationData,
  transformStaffData,
} from "@/lib/strapi";
import ProjectDetailClient from "./ProjectDetailClient";

const toSlug = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const slugMatchesProject = (project, target) => {
  if (!project) return false;
  const normalizedTarget = toSlug(target);
  const candidates = [
    project.slug,
    toSlug(project.slug),
    toSlug(project.title),
  ].filter(Boolean);
  return candidates.some((candidate) => candidate === target || candidate === normalizedTarget);
};

const matchesPerson = (value, person) => {
  if (!value || !person) return false;
  const key = toSlug(value);
  return key === toSlug(person.slug) || key === toSlug(person.name);
};

export default async function ProjectDetailPage({ params }) {
  const slugParam = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const projectParam = Array.isArray(params?.project) ? params.project[0] : params?.project;

  if (!slugParam || !projectParam) {
    notFound();
  }

  const strapiPerson = await getStaffMember(slugParam);
  if (!strapiPerson) {
    notFound();
  }

  const [person] = transformStaffData([strapiPerson]);
  if (!person) {
    notFound();
  }

  const memberProjectsRaw = transformProjectData(
    strapiPerson.attributes?.projects?.data ?? []
  );
  const leadingProjectsRaw = transformProjectData(
    strapiPerson.attributes?.leading_projects?.data ?? []
  );

  const combinedProjects = [...leadingProjectsRaw, ...memberProjectsRaw];

  let projectEntry = combinedProjects.find((project) =>
    slugMatchesProject(project, projectParam)
  );

  let projectStrapi = projectEntry?._strapi ?? null;

  if (!projectEntry || !projectStrapi) {
    const fetchedProject = await getProject(projectParam);
    if (!fetchedProject) {
      notFound();
    }
    projectEntry = transformProjectData([fetchedProject])[0];
    projectStrapi = fetchedProject;
  }

  if (!projectEntry) {
    notFound();
  }

  const leadSlug = projectEntry.leadSlug || projectEntry.leadDetails?.slug || "";
  const leadName = projectEntry.leadName || projectEntry.lead || projectEntry.leadDetails?.name || "";

  const isLead = matchesPerson(leadSlug, person) || matchesPerson(leadName, person);
  const isMember = (projectEntry.members || []).some(
    (member) => matchesPerson(member.slug, person) || matchesPerson(member.name, person)
  );

  if (!isLead && !isMember) {
    notFound();
  }

  const publications = transformPublicationData(
    projectStrapi?.attributes?.publications?.data ?? []
  ).map(({ _strapi: _ignored, ...item }) => item);

  const leadIdentifier = projectEntry.leadDetails?.slug || projectEntry.leadSlug || "";

  let teamMembers = Array.isArray(projectEntry.members)
    ? projectEntry.members.map((member) => ({
        ...member,
        isLead:
          !!leadIdentifier && !!member?.slug && member.slug === leadIdentifier,
      }))
    : [];

  const hasLeadInTeam = teamMembers.some((member) => member.isLead);

  if (!hasLeadInTeam && (projectEntry.leadDetails?.name || projectEntry.leadName || projectEntry.lead)) {
    teamMembers = [
      {
        ...(projectEntry.leadDetails || {
          name: projectEntry.leadName || projectEntry.lead,
          slug: leadIdentifier,
        }),
        isLead: true,
      },
      ...teamMembers,
    ];
  }

  teamMembers = teamMembers.map((member) => ({
    ...member,
    isPrimary: member?.slug === person.slug,
  }));

  const { _strapi: _projectRaw, ...projectSerializable } = projectEntry;
  const teamSerializable = teamMembers.map(({ _strapi: _memberRaw, ...member }) => member);

  return (
    <ProjectDetailClient
      staffSlug={person.slug}
      project={projectSerializable}
      publications={publications}
      teamMembers={teamSerializable}
    />
  );
}
