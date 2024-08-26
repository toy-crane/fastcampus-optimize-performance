import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

async function Page() {
  const supabase = createClient();

  return (
    <div className="container">
      <Button>Hello</Button>
    </div>
  );
}

export default Page;
