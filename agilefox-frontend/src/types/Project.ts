export type Project = {
  id: number;
  name: string;
  description: string;
  estimationType: "DAYS" | "STORY_POINTS"; // poți adăuga alte opțiuni dacă există
};
