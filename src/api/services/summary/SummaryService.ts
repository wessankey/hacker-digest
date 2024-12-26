import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { promises as fs } from "fs";
import { decode } from "html-entities";
import { CommentItem } from "../hackernews/types";
import {
  CommentSummary,
  commentSummarySchema,
  TSummaryService,
} from "./schema";
import Handlebars from "handlebars";

Handlebars.registerHelper({
  json: function (context) {
    return JSON.stringify(context, null, 2);
  },
});

export class SummaryService implements TSummaryService {
  async summarizeComments(
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
}
