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
import { capitalizeString } from "@/utils/string";

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
          <div className="flex flex-col items-start md:h-full justify-between">
            <div className="w-full">
              <h3 className="text-2xl font-bold">{selectedStory.title}</h3>
              {loading && (
                <div className="mt-6">
                  <LoadingSkeleton />
                </div>
              )}
              {!loading && summary && <SummaryDetail summary={summary} />}
            </div>

            <button
              className="mt-6 dark:bg-indigo-600 bg-indigo-300 hover:bg-indigo-400  dark:hover:bg-indigo-700 dark:text-white text-gray-700 px-4 py-2 rounded-md font-bold"
              onClick={() => setSelectedStory(null)}
            >
              Close
            </button>
          </div>
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
      className="h-24 md:w-64 lg:w-48 w-full rounded-md p-4 flex-shrink-0 text-center hover:scale-105  shadow-lg hover:shadow-md transition-shadow duration-200 hover:cursor-pointer flex items-center justify-center dark:bg-indigo-700  bg-indigo-300 bg-opacity-50 font-semibold"
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
          <p
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: summary?.summary }}
          />
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
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 ">
      <div className="flex w-full justify-center h-full ">
        <div className="w-full ">
          <TabGroup>
            <TabList className="flex gap-4">
              <SummaryDetailTab label="Summary" />
              <SummaryDetailTab label="Sentiment" />
              <SummaryDetailTab label="Key Insights" />
            </TabList>
            <TabPanels className="mt-3">
              <TabPanel key="name" className="rounded-xl px-3">
                <div className="h-[23.75rem] overflow-y-auto">
                  <p
                    className="mt-4"
                    dangerouslySetInnerHTML={{ __html: summary?.summary }}
                  />
                </div>
              </TabPanel>

              <TabPanel key="sentiment" className="rounded-xl p-3">
                <p className="text-lg font-bold">
                  <span> {capitalizeString(summary?.sentiment)}</span>{" "}
                  <span className="text-2xl">{summary?.sentimentEmoji}</span>
                </p>
                <p className="mt-4">{summary?.justification}</p>
              </TabPanel>

              <TabPanel key="insights" className="rounded-xl p-3">
                <ul className="list-none list-inside space-y-4">
                  {summary?.keyInsights.map((insight) => (
                    <li key={insight} className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                      <span>{insight}</span>
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
      className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[focus]:outline-1 dark:text-white dark:data-[selected]:bg-white/10 dark:data-[selected]:data-[hover]:bg-white/10 dark:data-[hover]:bg-white/5 dark:data-[focus]:outline-white data-[selected]:bg-indigo-500/30 data-[selected]:data-[hover]:bg-indigo-500/30 data-[selected]:text-indigo-900 data-[hover]:bg-indigo-500/20 hover:bg-indigo-500/10 data-[focus]:outline-indigo-500"
    >
      {label}
    </Tab>
  );
}
