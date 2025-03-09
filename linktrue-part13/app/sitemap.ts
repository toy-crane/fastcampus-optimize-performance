import { MetadataRoute } from "next";
import { createClient } from "@/utils/supabase/server";

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://your-domain.com";

  // Static routes
  const routes = ["", "/account"];

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  // Dynamic user profile pages
  const supabase = createClient();
  const { data: profiles } = await supabase.from("profiles").select("username");

  const userPages =
    profiles?.map((profile) => ({
      url: `${baseUrl}/${profile.username}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })) || [];

  return [...staticPages, ...userPages];
}

export default sitemap;
