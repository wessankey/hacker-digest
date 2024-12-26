import { MockSummaryService } from "./MockSummaryService";
import { TSummaryService } from "./schema";
import { SummaryService } from "./SummaryService";

export const createSummaryService = (): TSummaryService => {
  if (process.env.NODE_ENV === "development") {
    return new MockSummaryService();
  }

  return new SummaryService();
};
