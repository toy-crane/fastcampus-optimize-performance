import { createClient } from "@/utils/supabase/server";

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

  return (
    <main className="flex min-h-screen flex-col p-24 mx-auto w-full md:w-[600px]">
      {links?.map((link) => (
        <div key={link.id}>
          <div>{link.url}</div>
          <div>{link.title}</div>
        </div>
      ))}
    </main>
  );
};

export default Page;
