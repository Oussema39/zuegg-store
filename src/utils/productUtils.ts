export const normalizeName = (name: string) => {
  if (typeof name !== "string") {
    return "";
  }

  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(" ", "_")
    .trim();
};
