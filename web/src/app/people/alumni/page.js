export const metadata = {
  title: "ICIA - Alumni",
};

import { getStaff, transformStaffData, PERSON_TYPE_FILTERS } from "@/lib/strapi";
import AlumniClient from "./AlumniClient";

export default async function AlumniPage() {
  const staffData = await getStaff({ types: PERSON_TYPE_FILTERS.alumni });
  const alumni = transformStaffData(staffData);

  return <AlumniClient staffData={alumni} />;
}
