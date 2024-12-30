"use client";

import { fetchCommentSummary } from "@/api/commentSummary";
import { Story } from "@/api/services/hackernews/types";
import { CommentSummary } from "@/api/services/summary/schema";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Modal } from "./Modal";
import { Lightbulb } from "lucide-react";
import { useScreenSize } from "@/hooks/useScreenSize";

export function BestStories({ stories }: { stories: Story[] }) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<CommentSummary | null>(null);

  const handleSelectStory = async (story: Story) => {
    setSelectedStory(story);
    setLoading(true);
    const result = await fetchCommentSummary(story);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="my-10 grid lg:grid-cols-4 gap-x-12 gap-y-4 lg:max-w-[850px] md:grid-cols-2 md:max-w-[600px] max-w-full grid-cols-1">
      {stories.map((story) => {
        return (
          <StoryTile
            key={story.id}
            story={story}
            onSelect={handleSelectStory}
          />
        );
      })}

      {selectedStory && (
        <Modal isOpen={!!selectedStory} onClose={() => setSelectedStory(null)}>
          <h3 className="text-2xl font-bold">{selectedStory.title}</h3>
          {loading && (
            <div className="mt-6">
              <LoadingSkeleton />
            </div>
          )}
          {!loading && summary && <SummaryDetail summary={summary} />}

          <button
            className="mt-6 border dark:border-white border-gray-700 hover:bg-slate-500 dark:text-white text-gray-700 px-4 py-2 rounded-md"
            onClick={() => setSelectedStory(null)}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}

function StoryTile({
  story,
  onSelect,
}: {
  story: Story;
  onSelect: (story: Story) => void;
}) {
  return (
    <div
      className="h-24 md:w-64 lg:w-48 w-full rounded-md p-4 flex-shrink-0 text-center hover:scale-105  shadow-lg hover:shadow-md transition-shadow duration-200 hover:cursor-pointer flex items-center justify-center dark:bg-slate-800 bg-slate-300 bg-opacity-50 font-semibold"
      onClick={() => onSelect(story)}
    >
      <p className="blur-none bg-opacity-0 line-clamp-2">{story.title}</p>
    </div>
  );
}

function SummaryDetail({ summary }: { summary: CommentSummary }) {
  const screenSize = useScreenSize();

  if (screenSize === "xs" || screenSize === "sm") {
    return (
      <div>
        <div className="mt-6">
          <p className="text-lg font-bold">Summary</p>
          <p className="mt-4">{summary?.summary}</p>
        </div>

        <div className="border-b border-gray-300 mt-6" />

        <div className="mt-6">
          <p className="text-lg font-bold">
            <span> {summary?.sentiment}</span>{" "}
            <span className="text-2xl">{summary?.sentimentEmoji}</span>
          </p>
          <p className="mt-4">{summary?.justification}</p>
        </div>

        <div className="border-b border-gray-300 mt-6" />

        <div className="mt-6">
          <ul className="list-none list-inside space-y-4">
            {summary?.keyInsights.map((insight) => (
              <li key={insight} className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-white">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex h-screen w-full justify-center">
        <div className="w-full">
          <TabGroup>
            <TabList className="flex gap-4">
              <SummaryDetailTab label="Summary" />
              <SummaryDetailTab label="Sentiment" />
              <SummaryDetailTab label="Key Insights" />
            </TabList>
            <TabPanels className="mt-3">
              <TabPanel key="name" className="rounded-xl p-3">
                {summary?.summary}
              </TabPanel>

              <TabPanel key="sentiment" className="rounded-xl p-3">
                <p className="text-lg font-bold">
                  <span> {summary?.sentiment}</span>{" "}
                  <span className="text-2xl">{summary?.sentimentEmoji}</span>
                </p>
                <p className="mt-4">{summary?.justification}</p>
              </TabPanel>

              <TabPanel key="insights" className="rounded-xl p-3">
                <ul className="list-none list-inside space-y-4">
                  {summary?.keyInsights.map((insight) => (
                    <li key={insight} className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-white">
                        {insight}
                      </span>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}

function SummaryDetailTab({ label }: { label: string }) {
  return (
    <Tab
      key="name"
      className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[focus]:outline-1 dark:text-white dark:data-[selected]:bg-white/10 dark:data-[selected]:data-[hover]:bg-white/10 dark:data-[hover]:bg-white/5 dark:data-[focus]:outline-white data-[selected]:bg-violet-500/30 data-[selected]:data-[hover]:bg-violet-500/30 data-[selected]:text-violet-900 data-[hover]:bg-violet-500/20 hover:bg-violet-500/10 data-[focus]:outline-violet-500"
    >
      {label}
    </Tab>
  );
}
