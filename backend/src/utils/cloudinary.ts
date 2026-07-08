import { v2 as cloudinary } from "cloudinary";
import { config } from "../config";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export async function uploadImage(
  filePath: string,
  folder = "users"
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    transformation: [{ width: 500, height: 500, crop: "fill", quality: "auto" }],
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function uploadFile(
  filePath: string,
  folder = "bookings/documents"
): Promise<{ url: string; publicId: string; type: string; size: number }> {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto",
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    type: result.format || "unknown",
    size: result.bytes || 0,
  };
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export async function deleteFile(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
}
