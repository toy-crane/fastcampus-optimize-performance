import UserProfileForm from "@/components/user-profile-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const searchParams = new URLSearchParams({
    next: "/account",
  });
  if (error || !data.user) {
    redirect(`/login?${searchParams.toString()}`);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();
  if (profileError) {
    throw error;
  }

  return (
    <div className="container">
      <UserProfileForm profile={profile} />
    </div>
  );
}

export default Page;
