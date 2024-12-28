import { createProvider } from "@/api/services/hackernews";
import { BestStories } from "./components/BestStories";

export default async function Home() {
  const provider = createProvider();
  const stories = await provider.getBestStories();

  return (
    <div className="p-12">
      <h1 className="text-5xl font-bold text-white">HackerDigest ⚡️📰</h1>
      <h2 className="text-xl text-white mt-6">
        AI summaries of the top Hacker News story comments
      </h2>
      <BestStories stories={stories} />
    </div>
  );
}
