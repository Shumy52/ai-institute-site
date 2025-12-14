export const metadata = {
  title: "ICIA - Researchers",
};

import { getStaff, groupStaffByType, transformStaffData } from "@/lib/strapi";
import ResearchersClient from "./ResearchersClient";

export const dynamic = "force-dynamic";
export const revalidate = 600; 

export default async function ResearchersPage() {
  const staffData = await getStaff();
  const staff = transformStaffData(staffData);
  const staffByType = groupStaffByType(staff);
  
  return <ResearchersClient staffData={staffByType} />;
}