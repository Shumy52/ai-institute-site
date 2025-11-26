import proDataJson from "./staff/proData.json";

export const proData = proDataJson;

export const getProjectsByMember = (slugOrName) => {
  if (!Array.isArray(proData)) return [];
  const slugLC = String(slugOrName || "").toLowerCase();

  return proData.filter((p) => {
    const owner = (p.personSlug || p.ownerSlug || p.slug || "").toLowerCase?.() || "";
    const members = p.members || p.team || [];
    const byOwner = owner === slugLC;
    const byMembers =
      Array.isArray(members) &&
      members.some((m) =>
        typeof m === "string"
          ? m.toLowerCase() === slugLC
          : m && typeof m === "object" &&
            (typeof m.slug === "string" && m.slug.toLowerCase() === slugLC)
      );
    return byOwner || byMembers;
  });
};
