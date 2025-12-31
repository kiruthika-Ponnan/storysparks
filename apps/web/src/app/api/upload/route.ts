import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getCurrentUser } from "@/lib/auth";
// import { prisma } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  projectAssets: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    video: { maxFileSize: "100MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const user = await getCurrentUser();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Temporarily mock the asset creation without Prisma
      console.log("Mock asset created:", {
        projectId: metadata.projectId,
        type: file.type.startsWith("image/") ? "IMAGE" : "VIDEO",
        fileName: file.name,
        url: file.url,
        metadata: {
          size: file.size,
          type: file.type,
        },
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
