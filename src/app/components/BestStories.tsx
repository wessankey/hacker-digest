"use client";

import { fetchCommentSummary } from "@/api/commentSummary";
import { Story } from "@/api/services/hackernews/types";
import { CommentSummary } from "@/api/services/summary/schema";
import { useScreenSize } from "@/hooks/useScreenSize";
import { capitalizeString } from "@/utils/string";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  CircleAlert,
  Lightbulb,
  RefreshCcw,
  SquareArrowOutUpRight,
  FileText,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Modal } from "./Modal";

export function BestStories({ stories }: { stories: Story[] }) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<CommentSummary | null>(null);
  const [error, setError] = useState(false);

  const handleSelectStory = async (story: Story) => {
    setError(false);
    setSelectedStory(story);
    setLoading(true);
    const result = await fetchCommentSummary(story);
    setLoading(false);
    if (!result) {
      setSummary(null);
      setError(true);
    } else {
      setSummary(result);
    }
  };

  const handleClose = () => {
    setSelectedStory(null);
    setSummary(null);
    setError(false);
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
        <Modal isOpen={!!selectedStory} onClose={handleClose}>
          {summary && (
            <SummaryBody
              summary={summary}
              selectedStory={selectedStory}
              setSelectedStory={setSelectedStory}
            />
          )}

          {error && (
            <ErrorMessage
              onRetry={() => handleSelectStory(selectedStory)}
              onClose={handleClose}
            />
          )}

          {loading && (
            <div className="mt-6">
              <LoadingSkeleton />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

function SummaryBody({
  summary,
  selectedStory,
  setSelectedStory,
}: {
  summary: CommentSummary;
  selectedStory: Story;
  setSelectedStory: (story: Story | null) => void;
}) {
  return (
    <div className="flex flex-col items-start justify-between md:h-[34rem]">
      <h3 className="text-2xl font-bold">{selectedStory.title}</h3>

      <div className="flex-shrink flex-grow overflow-y-auto">
        <div className="flex gap-10">
          <a
            href={selectedStory.url}
            target="_blank"
            className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500 pt-3 flex items-center gap-1"
          >
            <FileText className="w-4 h-4 inline-block" />
            <span>View original article</span>
            <SquareArrowOutUpRight className="w-3 h-3 inline-block" />
          </a>

          <a
            href={`https://news.ycombinator.com/item?id=${selectedStory.id}`}
            target="_blank"
            className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500 pt-3 flex items-center gap-1"
          >
            <MessageCircle className="w-4 h-4 inline-block" />
            <span>View original discussion</span>
            <SquareArrowOutUpRight className="w-3 h-3 inline-block" />
          </a>
        </div>
        <SummaryDetail summary={summary} />
      </div>

      <div className="w-full flex-shrink-0">
        <button
          className="mt-8 dark:bg-indigo-600 bg-indigo-300 hover:bg-indigo-400  dark:hover:bg-indigo-700 dark:text-white text-gray-700 px-4 py-2 rounded-md font-bold"
          onClick={() => setSelectedStory(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ErrorMessage({
  onRetry,
  onClose,
}: {
  onRetry: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center h-full rounded-md p-4 mt-20">
      <CircleAlert className="w-10 h-10 text-red-500" />
      <h3 className="text-2xl font-bold text-red-500 mt-4">
        Unable to Generate Summary
      </h3>
      <p className="text-center mt-4">
        We encountered an error while generating the summary. This might be due
        to temprary issues or high server load.
      </p>

      <div className="flex gap-4 mt-6">
        <button
          className="dark:bg-indigo-600 bg-indigo-300 hover:bg-indigo-400  dark:hover:bg-indigo-700 dark:text-white text-gray-700 px-4 py-2 rounded-md font-bold flex items-center gap-2"
          onClick={onRetry}
        >
          <RefreshCcw className="w-5 h-5" />
          <span>Try Again</span>
        </button>

        <button
          className="bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-400 rounded-md px-4 py-2 font-bold transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <p className="mt-4 text-sm dark:text-gray-400 text-gray-700">
        If the problem persists, please try again later.
      </p>
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
        <Summary summary={summary} />
        <div className="border-b border-gray-300 mt-6" />

        <Sentiment summary={summary} />
        <div className="border-b border-gray-300 mt-6" />

        <KeyInsights summary={summary} />
      </div>
    );
  }

  return (
    <div className="pt-4">
      <div className="flex w-full justify-center h-full ">
        <div className="w-ful">
          <TabGroup>
            <TabList className="flex gap-4 border-t border-b py-3 border-gray-300 dark:border-gray-700">
              <SummaryDetailTab label="Summary" />
              <SummaryDetailTab label="Sentiment" />
              <SummaryDetailTab label="Key Insights" />
            </TabList>
            <TabPanels className="mt-3">
              <TabPanel key="name" className="rounded-xl px-3">
                <Summary summary={summary} />
              </TabPanel>

              <TabPanel key="sentiment" className="rounded-xl p-3">
                <Sentiment summary={summary} />
              </TabPanel>

              <TabPanel key="insights" className="rounded-xl p-3">
                <KeyInsights summary={summary} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}

function Summary({ summary }: { summary: CommentSummary }) {
  const screenSize = useScreenSize();
  const isMobile = screenSize === "xs" || screenSize === "sm";

  return (
    <div className="mt-6 overflow-y-auto md:h-[23.75rem] md:mt-3">
      {isMobile && <p className="text-lg font-bold">Summary</p>}
      <p
        className="mt-1"
        dangerouslySetInnerHTML={{ __html: summary?.summary }}
      />
    </div>
  );
}

function Sentiment({ summary }: { summary: CommentSummary }) {
  return (
    <div className="mt-6 md:mt-0">
      <p className="text-lg font-bold">
        <span> {capitalizeString(summary?.sentiment)}</span>{" "}
        <span className="text-2xl">{summary?.sentimentEmoji}</span>
      </p>
      <p className="mt-4">{summary?.justification}</p>
    </div>
  );
}

function KeyInsights({ summary }: { summary: CommentSummary }) {
  return (
    <div className="mt-6 md:mt-0">
      <ul className="list-none list-inside space-y-4">
        {summary?.keyInsights.map((insight) => (
          <li key={insight} className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
            <span>{insight}</span>
          </li>
        ))}
      </ul>
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
