import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      projectLink: z.string(),
      sourceCodeLink: z.string().optional(),
      title: z.string(),
      type: z.string(),
      description: z.string(),
      image: image(),
      technologies: z.array(z.string()),
    }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.date(),
      image: image(),
      imageAlt: z.string(),
      category: z.string().optional(),
    }),
});

export const collections = {
  projects: projectsCollection,
  blog: blogCollection,
};
