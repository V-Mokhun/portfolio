import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      projectLink: z.string(),
      sourceCodeLink: z.string(),
      title: z.string(),
      type: z.string(),
      description: z.string(),
      image: image(),
      technologies: z.array(z.string()),
    }),
});

export const collections = {
  projects: projectsCollection,
};
