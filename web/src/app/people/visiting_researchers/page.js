export const metadata = {
  title: "ICIA - Visiting Researchers",
};

import { getStaff, groupStaffByType, transformStaffData } from "@/lib/strapi";
import VisitingResearchersClient from "./VisitingResearchersClient";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export default async function VisitingResearchersPage() {
  const staffData = await getStaff();
  const staff = transformStaffData(staffData);
  const staffByType = groupStaffByType(staff);
  const visiting = staffByType["Visiting Researchers"] || [];

  return <VisitingResearchersClient staffData={visiting} />;
}
