import staffDataJson from "./staff/staffData.json";

export const staffData = staffDataJson;

export const allStaff = Object.values(staffData).flat();
