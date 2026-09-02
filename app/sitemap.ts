import type { MetadataRoute } from "next";

import { supabase } from "../lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.jr-beats.fr";

  const { data: beats, error } = await supabase
    .from("beats")
    .select("slug");

  if (error) {
    console.error(
      "Erreur génération sitemap :",
      error
    );
  }

  const beatPages: MetadataRoute.Sitemap =
    beats?.map((beat) => ({
      url: `${baseUrl}/beats/${beat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    ...beatPages,
  ];
}