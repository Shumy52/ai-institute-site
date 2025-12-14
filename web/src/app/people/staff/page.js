export const metadata = {
  title: "ICIA - Staff",
};

import { getStaff, groupStaffByType, transformStaffData } from "@/lib/strapi";
import StaffClient from "./StaffClient";

export const revalidate = 600; // Revalidate every 10 minutes
export const dynamic = "force-dynamic"; // The data is fetched at runtime instead of docker build 

export default async function StaffPage() {
  const staffData = await getStaff();
  const staff = transformStaffData(staffData);
  const staffByType = groupStaffByType(staff);
  const staffOnly = staffByType.Staff || staffByType.staff || staffByType.Personal || [];

  return <StaffClient staffData={staffOnly} />;
}
