import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.jr-beats.fr";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/login",
        "/success",
        "/api/",
      ],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}