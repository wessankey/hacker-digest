import { bestStoriesMock } from "@/mock/bestStories";
import { mockComments } from "@/mock/comments";
import { CommentItem, HackerNewsProvider, Story } from "./types";

export class HackerNewsMockProvider implements HackerNewsProvider {
  async getBestStories(): Promise<Story[]> {
    return bestStoriesMock;
  }

  async getComments(story: Story): Promise<CommentItem[]> {
    return story.kids.reduce<CommentItem[]>((acc, cur) => {
      const comment = mockComments[cur.toString()];
      if (comment) acc.push(comment);
      return acc;
    }, []);
  }
}
