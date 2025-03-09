import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GithubIcon, XIcon } from "./icons";
import { createClient } from "@/utils/supabase/server";
import { Skeleton } from "./ui/skeleton";

export const UserInfoSkeleton = () => (
  <>
    <Skeleton className="w-24 h-24 rounded-full mb-4" />
    <Skeleton className="h-8 w-40 mb-2" />
    <Skeleton className="h-4 w-60 mb-4" />
    <div className="flex gap-4 justify-center mb-8">
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="w-8 h-8 rounded-full" />
    </div>
  </>
);

export const UserInfo = async ({ username }: { username: string }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Profile not found");

  const profile = data;
  return (
    <>
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
    </>
  );
};
