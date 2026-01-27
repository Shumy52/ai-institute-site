export const metadata = {
  title: "ICIA - Visiting Researchers",
};

import { getStaff, transformStaffData, PERSON_TYPE_FILTERS } from "@/lib/strapi";
import VisitingResearchersClient from "./VisitingResearchersClient";

export default async function VisitingResearchersPage() {
  const staffData = await getStaff({ types: PERSON_TYPE_FILTERS.visiting });
  const visiting = transformStaffData(staffData);

  return <VisitingResearchersClient staffData={visiting} />;
}
