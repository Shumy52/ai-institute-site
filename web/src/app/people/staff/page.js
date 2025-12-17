export const metadata = {
  title: "ICIA - Staff",
};

import { getStaff, transformStaffData, PERSON_TYPE_FILTERS } from "@/lib/strapi";
import StaffClient from "./StaffClient";

export default async function StaffPage() {
  const staffData = await getStaff({ types: PERSON_TYPE_FILTERS.staff });
  const staff = transformStaffData(staffData);

  return <StaffClient staffData={staff} />;
}
