export const metadata = {
  title: "ICIA - News",
};

import NewsClient from "./NewsClient";
import { getNewsArticles, transformNewsData } from "@/lib/strapi";

// Force revalidate
export const dynamic = "force-dynamic";
export const revalidate = 600;

export default async function NewsPage() {
  const news = await getNewsArticles();
  const newsItems = transformNewsData(news);
  return <NewsClient newsItems={newsItems} />;
}