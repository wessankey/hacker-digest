import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { readFileSync } from "fs";
import Handlebars from "handlebars";
import { decode } from "html-entities";
import path from "path";
import { createSummary, getSummary } from "../cache";
import { CommentItem, Story } from "../hackernews/types";
import {
  CommentSummary,
  commentSummarySchema,
  TSummaryService,
} from "./schema";

Handlebars.registerHelper({
  json: function (context) {
    return JSON.stringify(context, null, 2);
  },
});

export class SummaryService implements TSummaryService {
  async getSummary(story: Story, comments: CommentItem[]) {
    const summary = await this.summarizeComments(story.title, comments);
    await createSummary(story.id, summary);
    return summary;
  }

  async getCachedSummary(storyId: number): Promise<CommentSummary | undefined> {
    const cachedSummary = await getSummary(storyId);
    if (cachedSummary) return cachedSummary;
  }

  async summarizeComments(
    title: string,
    comments: CommentItem[]
  ): Promise<CommentSummary> {
    const promptSource = readFileSync(
      path.join(process.cwd(), "prompts/comments.hbs"),
      "utf8"
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
}
