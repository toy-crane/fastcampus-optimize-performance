import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Tables } from "@/database.types";
import parse from "node-html-parser";
import { createClient } from "@/utils/supabase/server";
import { Skeleton } from "./ui/skeleton";

export const LinkListSkeleton = () => (
  <div className="space-y-4 max-w-[400px] w-full">
    {[...Array(3)].map((_, index) => (
      <Skeleton key={index} className="h-32 w-full rounded-md" />
    ))}
  </div>
);

async function getOgImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);
    return (
      root
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content") || null
    );
  } catch (error) {
    console.error("Error fetching OG image:", error);
    return null;
  }
}

const LinkList = async ({ username }: { username: string }) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("links")
    .select("*, profiles!inner(username)")
    .eq("profiles.username", username);

  if (error) {
    throw error;
  }

  const links = data;

  const linksWithOgImages = await Promise.all(
    links.map(async (link: Tables<"links">) => ({
      ...link,
      ogImage: await getOgImage(link.url),
    }))
  );

  return (
    <div className="flex flex-col gap-4 max-w-[400px] w-full px-4">
      {linksWithOgImages.map((link) => (
        <Link href={link.url} key={link.id}>
          <Card>
            <CardContent className="flex p-4 space-x-6 items-center">
              <div className="w-16 h-16 rounded-xl overflow-hidden relative">
                <Image
                  src={link.ogImage || "/default-og-image.png"}
                  alt={link.title}
                  fill
                  className="object-cover w-full h-full"
                  quality={85}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-medium">{link.title}</h2>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default LinkList;
