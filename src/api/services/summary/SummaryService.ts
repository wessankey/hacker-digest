import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import Handlebars from "handlebars";
import { createSummary, getSummary } from "../cache";
import { Story, TCommentItem } from "../hackernews/types";
import { prompt as promptSource } from "./prompt";
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
  async getSummary(story: Story, comments: TCommentItem[]) {
    const summary = await this.summarizeComments(story.title, comments);
    if (summary) {
      await createSummary(story.id, summary);
      return summary;
    }
  }

  async getCachedSummary(storyId: number): Promise<CommentSummary | undefined> {
    const cachedSummary = await getSummary(storyId);
    if (cachedSummary) return cachedSummary;
  }

  async summarizeComments(
    title: string,
    comments: TCommentItem[]
  ): Promise<CommentSummary | undefined> {
    const parsedComments = comments.map((comment) => ({
      by: comment.by,
      text: comment.text,
    }));

    const promptTemplate = Handlebars.compile(promptSource);
    const prompt = promptTemplate({
      storyTitle: title,
      comments: parsedComments,
    });

    try {
      const { object } = await generateObject({
        // @ts-expect-error - not sure why this is an issue
        model: openai("gpt-4o-mini"),
        system:
          "You are a helpful assistant that summarizes comments from a Hacker News story.",
        prompt: prompt,
        schema: commentSummarySchema,
      });

      return object;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error generating summary:", error.message);
      }
    }

    return undefined;
  }
}
