"use server";
import { UploadApiResponse } from "cloudinary";
import { Buffer } from "buffer";
import cloudinary from "@/config/cloudinary.confg";

function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export const uploadImage = async (base64data?: string | null, userName?: string | null) => {
  if (!base64data) {
    throw new Error("No image data provided.");
  }
  if (!userName) {
    throw new Error("Username is not provided.");
  }

  try {
    const buffer = Buffer.from(base64data.split(",")[1], "base64");
    const slugifiedName = toSlug(userName);
    const public_id = `images/${slugifiedName}`;

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ public_id }, (error, result) => {
          if (error) {
            reject(new Error("Cloudinary upload failed"));
          } else {
            resolve(result);
          }
        })
        .end(buffer);
    });

    return (uploadResponse as UploadApiResponse).secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload image.");
  }
};
