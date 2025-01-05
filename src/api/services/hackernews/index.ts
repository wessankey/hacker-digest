import { HackerNewsAPIProvider } from "./apiProvider";
import { HackerNewsMockProvider } from "./mockProvider";
import { HackerNewsProvider } from "./types";

export const createProvider = (): HackerNewsProvider => {
  if (process.env.ENVIRONMENT === "development") {
    return new HackerNewsMockProvider();
  }

  return new HackerNewsAPIProvider();
};
