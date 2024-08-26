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

  return <div className="container">Account</div>;
}

export default Page;
