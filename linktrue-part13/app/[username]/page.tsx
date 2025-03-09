import LinkList, { LinkListSkeleton } from "@/components/link-list";
import { UserInfo, UserInfoSkeleton } from "@/components/user-info";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!profile) {
    return {
      title: "Profile Not Found",
    };
  }

  return {
    title: `@${profile.username} | Link.true`,
    description: profile.bio || `Check out ${profile.username}'s profile`,
    openGraph: {
      images: [{ url: profile.avatar_url || "/default-avatar.png" }],
    },
  };
}

const Page = async ({ params }: { params: { username: string } }) => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center pt-10 pb-6">
          <Suspense fallback={<UserInfoSkeleton />}>
            <UserInfo username={params.username} />
          </Suspense>
          <Suspense fallback={<LinkListSkeleton />}>
            <LinkList username={params.username} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Page;
