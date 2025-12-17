export const metadata = {
  title: "ICIA - Alumni",
};

import { getStaff, groupStaffByType, transformStaffData } from "@/lib/strapi";
import AlumniClient from "./AlumniClient";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export default async function AlumniPage() {
  const staffData = await getStaff();
  const staff = transformStaffData(staffData);
  const staffByType = groupStaffByType(staff);
  const alumni = staffByType.Alumni || [];

  return <AlumniClient staffData={alumni} />;
}
