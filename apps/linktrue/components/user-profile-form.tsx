"use client";
import { Tables } from "@/database.types";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef } from "react";
import { uploadAvatar } from "@/lib/action";

const UserProfileForm = ({ profile }: { profile: Tables<"profiles"> }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    profile.avatar_url
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      <form className="space-y-6">
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
        <div className="flex justify-center">
          <Button className="w-full">저장하기</Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
