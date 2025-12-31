import { z } from "zod";

export const steps = ["SCRIPT", "STORYBOARD", "VOICEOVER", "VIDEO", "CAMPAIGN_TIPS"] as const;

export const createProjectSchema = z.object({
  businessName: z.string().min(2),
  businessCategory: z.string().min(2),
  offer: z.string().min(2),
  tone: z.enum(["FRIENDLY", "LUXURY", "URGENT", "PLAYFUL", "BOLD"]),
});
