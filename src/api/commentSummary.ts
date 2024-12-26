"use server";

import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { promises as fs } from "fs";
import Handlebars from "handlebars";
import { decode } from "html-entities";
import { z } from "zod";
import { CommentItem } from "./providers/hackernews/types";
import { createProvider } from "./providers/hackernews";
import { Story } from "./providers/hackernews/types";

Handlebars.registerHelper({
  json: function (context) {
    return JSON.stringify(context, null, 2);
  },
});

const commentSummarySchema = z.object({
  summary: z.string(),
  keyInsights: z.array(z.string()),
  sentiment: z.string(),
  justification: z.string(),
});

export type CommentSummary = z.infer<typeof commentSummarySchema>;

export async function fetchCommentSummary(story: Story) {
  const provider = createProvider();
  const comments = await provider.getComments(story);
  return await summarizeComments(story.title, comments);
}

async function summarizeComments(
  title: string,
  comments: CommentItem[]
): Promise<CommentSummary> {
  const promptSource = await fs.readFile(
    process.cwd() + "/src/prompts/comments.hbs",
    { encoding: "utf-8" }
  );

  const parsedComments = comments.map((comment) => ({
    by: comment.by,
    text: decode(comment.text),
    time: comment.time,
  }));

  const promptTemplate = Handlebars.compile(promptSource);
  const prompt = promptTemplate({
    storyTitle: title,
    comments: parsedComments,
  });

  const { object } = await generateObject({
    model: anthropic("claude-3-5-sonnet-latest"),
    system:
      "You are a helpful assistant that summarizes comments from a Hacker News story.",
    prompt: prompt,
    schema: commentSummarySchema,
  });

  return object;
}
