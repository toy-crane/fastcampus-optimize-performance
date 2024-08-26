import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function Page() {
  const signupWithGoogle = async () => {
    "use server";
    const origin = headers().get("origin");
    const supabase = createClient();
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      throw error;
    } else {
      redirect(data.url);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Link True</CardTitle>
          <CardDescription>회원 가입</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Button
              variant="outline"
              className="w-full"
              formAction={signupWithGoogle}
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              구글로 시작하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
