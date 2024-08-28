import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const signup = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          name: username,
        },
      },
    });
    if (error) {
      throw error;
    } else {
      redirect("/");
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
          <form action={signup}>
            <div className="mb-4">
              <div className="space-y-2 mb-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="name">name</Label>
                <Input id="name" type="text" name="name" required />
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="username">username</Label>
                <Input id="username" type="text" name="username" required />
              </div>
              <Button type="submit" className="w-full">
                회원가입
              </Button>
            </div>
          </form>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                혹은 다른 소셜 계정으로 로그인
              </span>
            </div>
          </div>
          <form action={signupWithGoogle}>
            <Button variant="outline" className="w-full">
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
