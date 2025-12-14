export const metadata = {
  title: "ICIA - Projects",
};

// Always render on the server so we don't cache empty data captured at build time
export const revalidate = 0;
export const dynamic = "force-dynamic";

import ProjectsClient from "./projectClient";
import { getProjects, transformProjectData } from "@/lib/strapi";

export default async function ProjectPage() {
  const strapiProjects = await getProjects();
  const projects = transformProjectData(strapiProjects);

  return <ProjectsClient projects={projects} />;
}
