export const metadata = {
  title: "ICIA - News",
};

import NewsClient from "./NewsClient";
import { getNewsArticles, transformNewsData } from "@/lib/strapi";

export const revalidate = 600;

export default async function NewsPage() {
  const news = await getNewsArticles();
  const newsGroups = transformNewsData(news);
  return <NewsClient newsGroups={newsGroups} />;
}