"use server";

import { createProvider } from "@/providers/hackernews";
import { CommentItem, Story } from "@/providers/hackernews/types";
import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

export async function fetchCommentSummary(story: Story) {
  const provider = createProvider();
  const comments = await provider.getComments(story);

  return comments;

  // return await summarizeComments(commentDetailsParsed);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function summarizeComments(comments: CommentItem[]) {
  const { text } = await generateText({
    model: anthropic("claude-3-haiku-20240307"),
    system: "You are a helpful assistant that summarizes comments.",
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });

  return text;
}
