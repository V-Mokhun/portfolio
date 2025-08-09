import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async () => {
  const blog = (await getCollection("blog")).map((e) => ({
    title: e.data.title,
    slug: e.slug,
    date: e.data.date,
  }));

  const projectsAll = await getCollection("projects");
  const projects = projectsAll.reduce<Record<string, Array<any>>>((acc, e) => {
    const [lang, id] = e.id.split("/");
    if (!acc[lang]) acc[lang] = [];
    acc[lang].push({
      id,
      title: e.data.title,
      projectLink: e.data.projectLink,
      sourceCodeLink: e.data.sourceCodeLink ?? null,
      technologies: e.data.technologies,
    });
    return acc;
  }, {});

  console.log("blog", blog);
  blog.sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return new Response(
    JSON.stringify({
      blog: blog.map(({ title, slug }) => ({ title, slug })),
      projects,
    }),
    {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
    }
  );
};


