import { decode } from "html-entities";
import { z } from "zod";
import {
  BestStoriesSchema,
  CommentItemSchema,
  HackerNewsProvider,
  Story,
  StorySchema,
  TCommentItem,
} from "./types";

const MAX_COMMENTS = 100;

export class HackerNewsAPIProvider implements HackerNewsProvider {
  private readonly baseUrl = "https://hacker-news.firebaseio.com/v0/";

  async getBestStories(): Promise<Story[]> {
    const response = await fetch(`${this.baseUrl}/beststories.json`);
    const data = await response.json();
    const bestStoryIds = BestStoriesSchema.parse(data);

    const bestStories = await Promise.all(
      bestStoryIds.slice(0, 16).map(async (id) => {
        const response = await fetch(`${this.baseUrl}/item/${id}.json`);
        const data = await response.json();
        return StorySchema.parse(data);
      })
    );

    return bestStories;
  }

  async getComments(story: Story): Promise<TCommentItem[]> {
    const commentDetailRequests = story.kids.map((childId) =>
      fetch(`${this.baseUrl}/item/${childId}.json`)
    );

    const commentDetailsJson = await Promise.all(
      (await Promise.all(commentDetailRequests)).map((detail) => detail.json())
    );

    const commentDetailsParsed = z
      .array(CommentItemSchema)
      .parse(commentDetailsJson)
      .filter(
        (comment) =>
          !comment.dead && !comment.deleted && comment.type === "comment"
      )
      .slice(0, MAX_COMMENTS)
      .map((comment) => ({
        id: comment.id,
        text: decode(comment.text),
        by: comment.by,
        parent: comment.parent,
      }));

    return commentDetailsParsed;
  }
}
