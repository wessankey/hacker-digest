import { z } from "zod";

export const StorySchema = z.object({
  by: z.string(),
  descendants: z.number(),
  id: z.number(),
  kids: z.array(z.number()),
  score: z.number(),
  time: z.number(),
  title: z.string(),
  type: z.string(), // TODO: enum
  url: z.string().optional(),
});

export const BestStoriesSchema = z.array(z.number());

export type Story = z.infer<typeof StorySchema>;

export const CommentItemSchema = z.object({
  by: z.string().optional(),
  id: z.number(),
  kids: z.array(z.number()).optional(),
  parent: z.number(),
  text: z.string().optional(),
  time: z.number(),
  type: z.string(),
  deleted: z.boolean().optional(),
  dead: z.boolean().optional(),
});

export type TCommentItemSchema = z.infer<typeof CommentItemSchema>;

export type TCommentItem = Pick<TCommentItemSchema, "by" | "text"> & {
  nestedComments?: Omit<TCommentItem, "nestedComments">;
};

export interface HackerNewsProvider {
  getBestStories: () => Promise<Story[]>;
  getComments: (story: Story) => Promise<TCommentItem[]>;
}
