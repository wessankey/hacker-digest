import { MockSummaryService } from "./MockSummaryService";
import { TSummaryService } from "./schema";
import { SummaryService } from "./SummaryService";

export const createSummaryService = (): TSummaryService => {
  if (process.env.ENVIRONMENT === "development") {
    return new MockSummaryService();
  }

  return new SummaryService();
};
