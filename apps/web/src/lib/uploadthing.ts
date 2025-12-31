import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  projectAssets: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    video: { maxFileSize: "100MB", maxFileCount: 5 },
  })
    .middleware(async ({ req }) => {
      // Add authentication here
      return { userId: "temp-user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
