export const metadata = {
  title: "ICIA - Seminars",
};

import SeminarsClient from "./seminarsClient";

import { getSeminars, transformSeminarData } from "@/lib/strapi";

export const revalidate = 600;

export default async function SeminarsPage() {
  const seminars = await getSeminars();
  const items = transformSeminarData(seminars);
  return <SeminarsClient items={items} />;
}
