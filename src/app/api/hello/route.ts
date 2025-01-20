import { createProvider } from "@/api/services/hackernews";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const provider = createProvider();
  const stories = await provider.getBestStories();

  stories.forEach((story) => {
    console.log("log:story:", story.title);
  });

  console.log("log:Hello from ", process.env.VERCEL_REGION);
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
