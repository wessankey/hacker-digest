import { commentSummary } from "@/mock/summary";
import { CommentSummary, TSummaryService } from "./schema";

export class MockSummaryService implements TSummaryService {
  async summarizeComments(): Promise<CommentSummary> {
    return commentSummary;
  }
}
