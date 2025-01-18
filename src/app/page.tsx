import { createProvider } from "@/api/services/hackernews";
import { BestStories } from "./components/BestStories";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export default async function Home() {
  const provider = createProvider();
  const stories = await provider.getBestStories();

  return (
    <div className="px-12 py-2 max-w-[1100px] mx-auto dark:text-white">
      <h1 className="text-5xl font-bold">HackerDigest ⚡️📰</h1>
      <h2 className="text-xl mt-6">
        AI summaries of the top Hacker News story comments
      </h2>
      <div className="flex justify-center">
        <BestStories stories={stories} />
      </div>
    </div>
  );
}
