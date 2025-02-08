import { createProvider } from "@/api/services/hackernews";
import { Story } from "@/api/services/hackernews/types";
import { createSummaryService } from "@/api/services/summary";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const STORY_CHUNK_SIZE = 4;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const provider = createProvider();
  const stories = await provider.getBestStories();

  const groups = stories.reduce((acc, story, index) => {
    if (index % STORY_CHUNK_SIZE === 0) acc.push([]);
    acc[acc.length - 1].push(story);
    return acc;
  }, [] as Story[][]);

  for (const group of groups) {
    const summaryRequests = group.map(async (story) => {
      const provider = createProvider();
      const summaryService = createSummaryService();
      const comments = await provider.getComments(story);
      return await summaryService.getSummary(story, comments);
    });

    await Promise.all(summaryRequests);
  }

  return new Response(JSON.stringify({ status: "ok" }));
}
