import { Button } from "@/components/ui/button";

function Page() {
  const formSubmit = async () => {
    "use server";
    console.log("formSubmit");
  };

  const formSubmit2 = async () => {
    "use server";
    console.log("formSubmit2");
  };

  return (
    <div className="container py-2">
      <form action={formSubmit} className="flex flex-col gap-2">
        <Button formAction={formSubmit2}>Hello</Button>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default Page;
