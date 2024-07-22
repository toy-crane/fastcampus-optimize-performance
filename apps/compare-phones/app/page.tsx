import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("phones")
    .select("*, phone_colors(*)");

  return (
    <div className="text-3xl font-bold flex-col items-center">
      <h1>Welcome to Compare Phones</h1>
      <Button className="w-full">Welcome</Button>
    </div>
  );
}

export default Page;
