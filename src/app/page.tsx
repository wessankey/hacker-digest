import { createProvider } from "@/api/services/hackernews";
import { BestStories } from "./components/BestStories";

export default async function Home() {
  const provider = createProvider();
  const stories = await provider.getBestStories();

  return <BestStories stories={stories} />;
}
