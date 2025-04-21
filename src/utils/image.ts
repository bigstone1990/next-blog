import { writeFile } from "fs/promises";
import path from "path";

export async function saveImage(file: File): Promise<string | null> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), "public/images");

  try {
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    return `/images/${fileName}`; // Return the URL path to access the image
  } catch (error) {
    console.error("Error saving image:", error);
    return null;
  }
}