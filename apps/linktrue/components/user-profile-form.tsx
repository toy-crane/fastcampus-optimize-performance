"use client";
import { Tables } from "@/database.types";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef } from "react";
import { uploadAvatar } from "@/lib/action";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다."),
  username: z.string().min(1, "사용자 이름은 필수입니다."),
  bio: z.string(),
  avatarUrl: z.string(),
  githubUrl: z.string(),
  twitterUrl: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const UserProfileForm = ({ profile }: { profile: Tables<"profiles"> }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    profile.avatar_url
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
      username: profile.username,
      bio: profile.bio ?? "",
      avatarUrl: profile.avatar_url ?? "",
      githubUrl: profile.github_url ?? "",
      twitterUrl: profile.twitter_url ?? "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Saving profile:", data);
    // 여기서 데이터를 백엔드로 전송합니다
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", profile.id);
      await uploadAvatar(formData);
    }
  };

  const triggerAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-4 p-4">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold text-left">마이 페이지</h1>
          <div className="flex flex-col items-center space-y-2">
            <Avatar
              className="w-16 h-16 cursor-pointer"
              onClick={triggerAvatarUpload}
            >
              <AvatarImage src={previewImage || ""} alt="User avatar" />
              <AvatarFallback className="hover:bg-muted/50">
                {profile.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Input
              ref={fileInputRef}
              id="avatar-upload"
              type="file"
              className="hidden"
              onChange={handleAvatarUpload}
              accept="image/*"
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input placeholder="사용자 이름을 입력해 주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="이름을 입력해 주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>bio</FormLabel>
                <FormControl>
                  <Input placeholder="자기소개를 입력해 주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>깃허브 URL</FormLabel>
                <FormControl>
                  <Input placeholder="github URL을 입력해 주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>트위터 URL</FormLabel>
                <FormControl>
                  <Input placeholder="트위터 URL을 입력해 주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button className="w-full">저장하기</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;
