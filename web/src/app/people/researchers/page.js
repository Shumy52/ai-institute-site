export const metadata = {
  title: "ICIA - Researchers",
};

import { getStaff, transformStaffData, PERSON_TYPE_FILTERS } from "@/lib/strapi";
import ResearchersClient from "./ResearchersClient";

export default async function ResearchersPage() {
  const staffData = await getStaff({ types: PERSON_TYPE_FILTERS.researchers });
  const staff = transformStaffData(staffData);

  return <ResearchersClient staffData={staff} />;
}