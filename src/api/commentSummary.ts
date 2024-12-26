"use server";

import { createProvider } from "./services/hackernews";
import { Story } from "./services/hackernews/types";
import { createSummaryService } from "./services/summary";

export async function fetchCommentSummary(story: Story) {
  const provider = createProvider();
  const comments = await provider.getComments(story);
  const summaryService = createSummaryService();
  return await summaryService.summarizeComments(story.title, comments);
}
