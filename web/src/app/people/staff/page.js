export const metadata = {
  title: "ICIA - Staff",
};

import { getStaff, transformStaffData } from "@/lib/strapi";
import StaffClient from "./StaffClient";

export default async function StaffPage() {
  // Fetch staff data from Strapi
  const strapiStaff = await getStaff();
  const staff = transformStaffData(strapiStaff);
  
  // If Strapi is not available, fallback to static data
  if (staff.length === 0) {
    console.warn('Strapi data not available, using StaffClient with static data');
    return <StaffClient />;
  }
  
  return <StaffClient staffData={staff} />;
}