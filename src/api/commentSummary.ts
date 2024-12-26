"use server";

import { createProvider } from "./providers/hackernews";
import { Story } from "./providers/hackernews/types";
import { createSummaryService } from "./services/summaryService";

export async function fetchCommentSummary(story: Story) {
  const provider = createProvider();
  const comments = await provider.getComments(story);
  const summaryService = createSummaryService();
  return await summaryService.summarizeComments(story.title, comments);
}
