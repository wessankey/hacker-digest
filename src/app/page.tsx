import { createProvider } from "@/api/services/hackernews";
import { BestStories } from "./components/BestStories";
import { promises as fs } from "fs";
import path from "path";

export default async function Home() {
  const provider = createProvider();
  const stories = await provider.getBestStories();

  const filePath = path.join(process.cwd(), "comments.hbs");
  const fileContent = await fs.readFile(filePath, "utf8");
  console.log(fileContent);

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
