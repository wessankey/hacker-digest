import { commentSummary } from "@/mock/summary";
import { CommentSummary, TSummaryService } from "./schema";

export class MockSummaryService implements TSummaryService {
  async getSummary(): Promise<CommentSummary> {
    return this.summarizeComments();
  }

  async getCachedSummary(): Promise<CommentSummary | undefined> {
    return undefined;
  }

  async summarizeComments(): Promise<CommentSummary> {
    return commentSummary;
  }
}
