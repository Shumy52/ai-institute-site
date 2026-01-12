import { getProjectBySlug, transformProjectData } from "@/lib/strapi";
import ProjectDetailsClient from "./ProjectDetails";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const projectData = await getProjectBySlug(slug);
  const project = transformProjectData([projectData])[0];

  return <ProjectDetailsClient project={project} />;
}
