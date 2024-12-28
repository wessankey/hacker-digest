"use client";

import { fetchCommentSummary } from "@/api/commentSummary";
import { Story } from "@/api/services/hackernews/types";
import { CommentSummary } from "@/api/services/summary/schema";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Modal } from "./Modal";

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
    <div className="my-10 grid lg:grid-cols-4 gap-x-12 gap-y-4 lg:max-w-[850px] md:grid-cols-3 md:max-w-[600px] sm:max-w-full sm:grid-cols-2">
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
        <Modal onClose={() => setSelectedStory(null)}>
          <h3 className="text-2xl font-bold">{selectedStory.title}</h3>
          {loading && (
            <div className="mt-6">
              <LoadingSkeleton />
            </div>
          )}
          {!loading && summary && <SummaryDetail summary={summary} />}

          <button
            className="mt-6 border border-white hover:bg-slate-500 text-white px-4 py-2 rounded-md"
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
      className=" text-white h-24 md:w-48 sm:w-64 rounded-md p-4 flex-shrink-0 text-center hover:scale-105  shadow-lg hover:shadow-md transition-shadow duration-200 hover:cursor-pointer flex items-center justify-center bg-slate-800 bg-opacity-50 font-semibold"
      onClick={() => onSelect(story)}
    >
      <p className="blur-none bg-opacity-0 line-clamp-2">{story.title}</p>
    </div>
  );
}

function SummaryDetail({ summary }: { summary: CommentSummary }) {
  return (
    <div className="mt-6">
      <div className="flex h-screen w-full justify-center">
        <div className="w-full">
          <TabGroup>
            <TabList className="flex gap-4">
              <Tab
                key="name"
                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Summary
              </Tab>
              <Tab
                key="sentiment"
                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Sentiment
              </Tab>
              <Tab
                key="insights"
                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Key Insights
              </Tab>
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
                <ul className="list-disc list-inside space-y-4">
                  {summary?.keyInsights.map((insight) => (
                    <li key={insight}>{insight}</li>
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
