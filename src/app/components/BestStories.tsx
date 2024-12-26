"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import { fetchCommentSummary } from "@/api/commentSummary";
import { Story } from "@/api/services/hackernews/types";
import { CommentSummary } from "@/api/services/summary/schema";

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
    <div className="flex gap-4 my-10 flex-wrap">
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
          {loading && <div>Loading...</div>}
          <div className="mt-6">{summary?.summary}</div>
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
      className=" text-white h-24 w-48 rounded-md p-4 flex-shrink-0 text-center hover:scale-105 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 hover:cursor-pointer flex items-center justify-center bg-slate-800"
      onClick={() => onSelect(story)}
    >
      {story.title}
    </div>
  );
}
