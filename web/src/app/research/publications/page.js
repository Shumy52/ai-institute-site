export const metadata = {
    title: "ICIA - Publications"
};

import { getPublications, getStaff, transformPublicationData, transformStaffData } from "@/lib/strapi";
import PublicationsClient from "./publicationsClient";

export default async function PublicationPage() {
  // Try to get data from Strapi first
  let publications = [];
  let staff = [];
  
  try {
    const strapiPubs = await getPublications();
    const strapiStaff = await getStaff();
    
    if (strapiPubs.length > 0) {
      publications = transformPublicationData(strapiPubs);
    }
    
    if (strapiStaff.length > 0) {
      staff = transformStaffData(strapiStaff);
    }
  } catch (error) {
    console.warn('Failed to fetch from Strapi, PublicationsClient will use static data:', error);
  }
  
  // Only pass props if we have Strapi data, otherwise let component use static data
  if (publications.length > 0 || staff.length > 0) {
    return <PublicationsClient publications={publications} staff={staff} />;
  }
  
  return <PublicationsClient />;
}
