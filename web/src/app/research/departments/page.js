export const metadata = {
  title: "ICIA - Research",
};

import ResearchClient from "./DepartmentsClient"
import { getStaff, transformStaffData } from "@/lib/strapi";

export const revalidate = 600; // Revalidate every 10 minutes
export const dynamic = "force-dynamic"; // The data is fetched at runtime instead of docker build

export default async function ResearchPage(){
  const staffData = await getStaff();
  const staff = transformStaffData(staffData);
  
  return <ResearchClient staffData={staff} />;
}