export const metadata = {
  title: "ICIA - Datasets",
};

import DatasetsClient from "./datasetsClient";
import {getStaff} from "@/lib/strapi";

export default async function DatasetsPage() {
  const staffData = await getStaff(); // TODO: Should I use Promise here?
  return <DatasetsClient staffData={staffData} />;
}