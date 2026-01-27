export const metadata = { title: "Industry engagement – AIRi @ UTCN" };

import { Suspense } from "react";
import Client from "./Client";
import { getProjects, transformProjectData } from "@/lib/strapi";

export default async function Page() {
  const strapiProjects = await getProjects();
  const projects = transformProjectData(strapiProjects);

  return (
    <Suspense fallback={null}>
      <Client projects={projects} />
    </Suspense>
  );
}
