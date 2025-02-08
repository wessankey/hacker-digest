import { createProvider } from "@/api/services/hackernews";
import { prompt as promptSource } from "@/api/services/summary/prompt";
import { commentSummarySchema } from "@/api/services/summary/schema";
// import { anthropic } from "@ai-sdk/anthropic";
import { streamObject } from "ai";
import Handlebars from "handlebars";
import { ollama } from "ollama-ai-provider";

Handlebars.registerHelper({
  json: function (context) {
    return JSON.stringify(context, null, 2);
  },
});

export async function POST(req: Request) {
  const { story } = await req.json();

  const provider = createProvider();
  const comments = await provider.getComments(story);

  const parsedComments = comments.map((comment) => ({
    by: comment.by,
    text: comment.text,
  }));

  const promptTemplate = Handlebars.compile(promptSource);
  const prompt = promptTemplate({
    storyTitle: story.title,
    comments: parsedComments,
  });

  const result = streamObject({
    // model: anthropic("claude-3-5-sonnet-latest"),
    model: ollama("llama3.2"),
    system:
      "You are a helpful assistant that summarizes comments from a Hacker News story.",
    prompt: prompt,
    schema: commentSummarySchema,
  });

  return result.toTextStreamResponse();
}
