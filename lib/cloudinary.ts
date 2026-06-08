import { supabaseAdmin } from "./supabase";

type UploadResult = {
  url: string;
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
};

export async function uploadImage(file: File, folder = "unique-mentors"): Promise<UploadResult> {
  if (!supabaseAdmin) {
    throw new Error("Supabase admin client not initialized. Please configure SUPABASE_SERVICE_ROLE_KEY.");
  }

  const bucketName = "uploads";

  // Create the bucket if it doesn't exist (fails silently if it does)
  try {
    await supabaseAdmin.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 5242880, // 5MB limit
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"]
    });
  } catch (e) {
    // Ignore error if bucket already exists
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabaseAdmin.storage
    .from(bucketName)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true
    });

  if (error) {
    throw error;
  }

  const { data: urlData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(filePath);

  return {
    url: urlData.publicUrl,
    secureUrl: urlData.publicUrl,
    publicId: filePath,
    width: 0,
    height: 0,
    format: fileExt || ""
  };
}

export async function deleteImage(publicId: string) {
  if (!supabaseAdmin) return false;
  const { error } = await supabaseAdmin.storage.from("uploads").remove([publicId]);
  return !error;
}

export function getOptimizedUrl(publicId: string, width = 1200, height = 800) {
  if (!supabaseAdmin) return "";
  const { data } = supabaseAdmin.storage.from("uploads").getPublicUrl(publicId);
  return data.publicUrl;
}
