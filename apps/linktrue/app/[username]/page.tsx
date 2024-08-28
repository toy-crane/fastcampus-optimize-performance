import { GithubIcon, XIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import parse from "node-html-parser";
import Image from "next/image";

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

const Page = async ({ params }: { params: { username: string } }) => {
  const supabase = createClient();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();
  if (profileError) {
    throw profileError;
  }

  const { data: links, error: linksError } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id);

  if (linksError) {
    throw linksError;
  }

  const linksWithOgImages = await Promise.all(
    links.map(async (link: Tables<"links">) => ({
      ...link,
      ogImage: await getOgImage(link.url),
    }))
  );

  return (
    <main className="flex min-h-screen flex-col p-24 items-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center pt-10 pb-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={profile.avatar_url || ""} alt="User avatar" />
            <AvatarFallback className="hover:bg-muted/50">
              <span className="text-4xl font-bold">
                {profile.username.charAt(0).toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-2">@{profile.username}</h1>
          <p className="text-gray-600 text-center mb-4">{profile.bio}</p>
          <div className="flex gap-4 justify-center mb-8">
            {profile.github_url && (
              <Link href={profile.github_url}>
                <GithubIcon className="w-8 h-8" />
              </Link>
            )}
            {profile.twitter_url && (
              <Link href={profile.twitter_url}>
                <XIcon className="w-8 h-8" />
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {linksWithOgImages.map((link) => (
              <Link href={link.url} key={link.id}>
                <Card className="w-[400px]">
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
        </div>
      </div>
    </main>
  );
};

export default Page;
