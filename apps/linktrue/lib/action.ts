"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadAvatar(formData: FormData) {
  const supabase = createClient();
  const file = formData.get("file") as File;
  const userId = formData.get("userId") as string;

  if (!file || !userId) throw new Error("File and userId are required");

  const timestamp = Date.now();
  const fileExtension = file.name.split(".").pop();
  const filePath = `${userId}/avatar-${timestamp}.${fileExtension}`;

  // Upload file
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);
  if (uploadError) throw uploadError;

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  // Update profile with new avatar URL
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", userId)
    .single();
  if (updateError) throw updateError;
  revalidatePath("/account");

  return publicUrl;
}
