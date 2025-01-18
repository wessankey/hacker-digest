"use server";

import { createProvider } from "./services/hackernews";
import { Story } from "./services/hackernews/types";
import { createSummaryService } from "./services/summary";

export async function fetchCommentSummary(story: Story) {
  console.log("LOG:fetchCommentSummary");
  const provider = createProvider();
  const summaryService = createSummaryService();
  const cachedSummary = await summaryService.getCachedSummary(story.id);
  if (cachedSummary) return cachedSummary;

  const comments = await provider.getComments(story);
  return await summaryService.getSummary(story, comments);
}
