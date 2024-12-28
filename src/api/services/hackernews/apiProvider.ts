import { z } from "zod";
import {
  BestStoriesSchema,
  CommentItem,
  CommentItemSchema,
  HackerNewsProvider,
  Story,
  StorySchema,
} from "./types";

export class HackerNewsAPIProvider implements HackerNewsProvider {
  private readonly baseUrl = "https://hacker-news.firebaseio.com/v0/";

  async getBestStories(): Promise<Story[]> {
    const response = await fetch(`${this.baseUrl}/beststories.json`);
    const data = await response.json();
    const bestStoryIds = BestStoriesSchema.parse(data);

    const bestStories = await Promise.all(
      bestStoryIds.slice(0, 2).map(async (id) => {
        const response = await fetch(`${this.baseUrl}/item/${id}.json`);
        const data = await response.json();
        return StorySchema.parse(data);
      })
    );

    return bestStories;
  }

  async getComments(story: Story): Promise<CommentItem[]> {
    const commentDetailRequests = story.kids.map((childId) =>
      fetch(`${this.baseUrl}/item/${childId}.json`)
    );

    const commentDetailsJson = await Promise.all(
      (await Promise.all(commentDetailRequests)).map((detail) => detail.json())
    );

    const commentDetailsParsed = z
      .array(CommentItemSchema)
      .parse(commentDetailsJson);

    return commentDetailsParsed;
  }
}
