import dataverseMap from "./staff/dataverseData.json";

export function getDatasetsByAuthor(slug) {
  const list = dataverseMap?.[slug];
  return Array.isArray(list) ? list : [];
}
