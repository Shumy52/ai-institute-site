const dataverseMap = {
    "AdrianPetru-Groza": ["Dataset 1", "Dataset 2", "Dataset 3"],
    "AncaNicoleta-Marginean": ["Dataset 1", "Dataset 2"]
};

export function getDatasetsByAuthor(slug) {
  const list = dataverseMap[slug];
  if (Array.isArray(list)) return list;

  return [];
}