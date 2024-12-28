import { CommentItem, Story } from "@/api/services/hackernews/types";
import { z } from "zod";

export const commentSummarySchema = z.object({
  summary: z.string(),
  keyInsights: z.array(z.string()),
  sentiment: z.string(),
  sentimentEmoji: z.string(),
  justification: z.string(),
});

export type CommentSummary = z.infer<typeof commentSummarySchema>;

export type TSummaryService = {
  getSummary: (
    story: Story,
    comments: CommentItem[]
  ) => Promise<CommentSummary>;
  getCachedSummary: (storyId: number) => Promise<CommentSummary | undefined>;
  summarizeComments: (
    title: string,
    comments: CommentItem[]
  ) => Promise<CommentSummary>;
};
