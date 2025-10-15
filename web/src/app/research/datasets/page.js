export const metadata = {
  title: "ICIA - Datasets",
};

import DatasetsClient from "./datasetsClient";
import {getStaff} from "@/lib/strapi";

export const revalidate = 600; // Revalidate every 10 minutes
export const dynamic = "force-dynamic"; // The data is fetched at runtime instead of docker build 

export default async function DatasetsPage() {
  const staffData = await getStaff(); // TODO: Should I use Promise here?
  return <DatasetsClient staffData={staffData} />;
}