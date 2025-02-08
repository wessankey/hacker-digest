import { bestStoriesMock } from "@/mock/bestStories";
import { mockComments } from "@/mock/comments";
import { TCommentItem, HackerNewsProvider, Story } from "./types";

export class HackerNewsMockProvider implements HackerNewsProvider {
  async getBestStories(): Promise<Story[]> {
    return bestStoriesMock;
  }

  async getComments(story: Story): Promise<TCommentItem[]> {
    return story.kids.reduce<TCommentItem[]>((acc, cur) => {
      const comment = mockComments[cur.toString()];
      if (comment) return [...acc, comment];
      return acc;
    }, []);
  }
}
