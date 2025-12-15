export const metadata = {
  title: "ICIA - Themes",
};

import ThemesClient from "./themesClient";
import { getResearchThemes } from "@/lib/strapi";

export const revalidate = 600; // Revalidate every 10 minutes
export const dynamic = "force-dynamic"; // Fetch at runtime to avoid build-time staleness

export default async function ThemesPage() {
  const themes = await getResearchThemes();

  const normalizedThemes = Array.isArray(themes)
    ? themes.map((entry) => {
        const attributes = entry?.attributes ?? entry ?? {};
        return {
          name: attributes.name || "",
          slug: attributes.slug || "",
          summary: attributes.summary || "",
          color: attributes.color || "",
        };
      })
    : [];

  return <ThemesClient themes={normalizedThemes} />;
}
