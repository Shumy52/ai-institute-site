export const metadata = {
  title: "ICIA - Publications",
};

import { getPublications, getStaff, transformPublicationData, transformStaffData } from "@/lib/strapi";
import PublicationsClient from "./publicationsClient";

export const revalidate = 600; // Revalidate every 10 minutes
export const dynamic = "force-dynamic"; // The data is fetched at runtime instead of docker build 

export default async function PublicationPage() {
  // TODO: Should use try/catch here to handle errors and display a friendly message
  // Run in parallel getPublications and getStaff to optimize performance (that is what Promise.all does)
  const [pubsData, staffData] = await Promise.all([getPublications(), getStaff()]);

  const publications = transformPublicationData(pubsData);
  const staff = transformStaffData(staffData);

  return <PublicationsClient publications={publications} staff={staff} />;
}
