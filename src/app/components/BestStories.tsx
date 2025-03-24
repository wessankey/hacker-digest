"use client";

import { Story } from "@/api/services/hackernews/types";
import { CommentSummary } from "@/api/services/summary/schema";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  CircleAlert,
  FileText,
  Lightbulb,
  MessageCircle,
  RefreshCcw,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useState } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Modal } from "./Modal";
import { fetchCommentSummary } from "@/api/commentSummary";

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
          {!error && (
            <SummaryBody
              summary={summary}
              isLoading={loading}
              selectedStory={selectedStory}
              handleClose={handleClose}
            />
          )}

          {error && (
            <ErrorMessage
              onRetry={() => handleSelectStory(selectedStory)}
              onClose={handleClose}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

function SummaryBody({
  summary,
  isLoading,
  selectedStory,
  handleClose,
}: {
  summary: CommentSummary | null;
  isLoading: boolean;
  selectedStory: Story;
  handleClose: () => void;
}) {
  return (
    <div className="flex flex-col items-start justify-between md:h-[31rem">
      <h3 className="text-2xl font-bold">{selectedStory.title}</h3>

      <div className="flex-shrink flex-grow w-full">
        <div className="flex gap-10 ">
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

        <SummaryDetail summary={summary} isLoading={isLoading} />
      </div>

      <div className="w-full flex-shrink-0 border-t border-gray-300 dark:border-gray-700 mt-4">
        <button
          className="mt-5 dark:bg-indigo-600 bg-indigo-300 hover:bg-indigo-400  dark:hover:bg-indigo-700 dark:text-white text-gray-700 px-4 py-2 rounded-md font-bold"
          onClick={handleClose}
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

function SummaryDetail({
  summary,
  isLoading,
}: {
  summary: CommentSummary | null;
  isLoading: boolean;
}) {
  const screenSize = useScreenSize();

  if (screenSize === "xs" || screenSize === "sm") {
    return (
      <div>
        <Summary summary={summary} isLoading={isLoading} />
        <div className="border-b border-gray-300 mt-6" />

        <Sentiment summary={summary} isLoading={isLoading} />
        <div className="border-b border-gray-300 mt-6" />

        <KeyInsights summary={summary} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="pt-4 w-full">
      <div className="flex w-full justify-center h-full ">
        <div className="w-full">
          <TabGroup>
            <TabList className="flex gap-4 w-full border-t border-b py-3 border-gray-300 dark:border-gray-700">
              <SummaryDetailTab label="Summary" />
              <SummaryDetailTab label="Sentiment" />
              <SummaryDetailTab label="Key Insights" />
            </TabList>
            <TabPanels className="md:h-[19.5rem] overflow-y-auto">
              <TabPanel key="name" className="rounded-xl px-3">
                <Summary summary={summary} isLoading={isLoading} />
              </TabPanel>

              <TabPanel key="sentiment" className="rounded-xl px-3">
                <Sentiment summary={summary} isLoading={isLoading} />
              </TabPanel>

              <TabPanel key="insights" className="rounded-xl px-3">
                <KeyInsights summary={summary} isLoading={isLoading} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}

function Summary({
  summary,
  isLoading,
}: {
  summary: CommentSummary | null;
  isLoading: boolean;
}) {
  const screenSize = useScreenSize();
  const isMobile = screenSize === "xs" || screenSize === "sm";

  return (
    <>
      {isLoading && !summary?.summary ? (
        <div className="mt-6">
          <LoadingSkeleton />
        </div>
      ) : (
        <div className="mt-6  md:mt-3">
          {isMobile && <p className="text-lg font-bold">Summary</p>}
          {summary?.summary?.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

function Sentiment({
  summary,
  isLoading,
}: {
  summary: CommentSummary | null;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading && !summary?.sentiment ? (
        <div className="mt-6">
          <LoadingSkeleton />
        </div>
      ) : (
        <div>
          <div className="w-[20rem]">
            <div className="rounded-full overflow-hidden relative h-8 mt-6">
              <div className="flex inset-0 absolute">
                <div className="flex-1 bg-red-500"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-green-700"></div>
              </div>

              <div
                className={`absolute top-0 bottom-0 w-4 bg-white border-4 border-gray-800 rounded-full ${
                  summary?.sentiment === "positive"
                    ? "right-[12.67%]"
                    : summary?.sentiment === "neutral"
                    ? "left-[48.5%]"
                    : "left-[16.67%]"
                }`}
              ></div>
            </div>

            <div className="flex justify-between mt-2 text-sm font-medium">
              <span className={"text-gray-400"}>Negative</span>
              <span className={"text-gray-400"}>Neutral</span>
              <span className={"text-gray-400"}>Positive</span>
            </div>
          </div>

          <div className="mt-6 md:mt-3">
            <p className="mt-4">{summary?.justification}</p>
          </div>
        </div>
      )}
    </>
  );
}

function KeyInsights({
  summary,
  isLoading,
}: {
  summary: CommentSummary | null;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading && !summary?.keyInsights ? (
        <div className="mt-6">
          <LoadingSkeleton />
        </div>
      ) : (
        <div className="mt-6 md:mt-3">
          <ul className="list-none list-inside space-y-4">
            {summary?.keyInsights?.map((insight) => (
              <li key={insight} className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
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
