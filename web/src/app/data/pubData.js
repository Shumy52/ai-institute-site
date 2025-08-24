import pubDataJson from "./staff/pubData.json";

export const pubData = pubDataJson;

export const getPublicationsByAuthor = (authorSlug) =>
  pubData.filter(
    (p) => Array.isArray(p.authors) && p.authors.includes(authorSlug)
  );
