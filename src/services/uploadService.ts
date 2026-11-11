import { fetchWithAuth } from "./api";

export type UploadFolder = "ads" | "categories" | "uploads";

export interface UploadedMediaFile {
  url: string;
  key: string;
  contentType: string;
  size: number;
  originalName: string;
}

export async function uploadMediaFiles(
  files: File[],
  folder: UploadFolder = "uploads"
): Promise<UploadedMediaFile[]> {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  formData.append("folder", folder);
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetchWithAuth(`/uploads?folder=${encodeURIComponent(folder)}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to upload media files");
  }

  return data.files || [];
}

export async function deleteUploadedMedia(urlOrKey: string): Promise<void> {
  if (!urlOrKey) return;
  await fetchWithAuth("/uploads", {
    method: "DELETE",
    body: JSON.stringify({ url: urlOrKey }),
  }).catch(() => {
    // Best-effort cleanup for unsaved uploads
  });
}

