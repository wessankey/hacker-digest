"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import { fetchCommentSummary } from "@/api/commentSummary";
import { Story } from "@/providers/hackernews/types";

export function BestStories({ stories }: { stories: Story[] }) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleSelectStory = async (story: Story) => {
    setSelectedStory(story);
    setLoading(true);
    const result = await fetchCommentSummary(story);
    console.log(JSON.stringify(result, null, 2));
    setSummary("result");
    setLoading(false);
  };

  return (
    <div className="flex gap-4 m-10 flex-wrap">
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
          <div>{selectedStory.title}</div>
          {loading && <div>Loading...</div>}
          <div>{summary}</div>
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
      className="border border-gray-300 w-48 rounded-md p-4 flex-shrink-0 text-center font-medium shadow-sm hover:shadow-md transition-shadow duration-200 hover:cursor-pointer"
      onClick={() => onSelect(story)}
    >
      {story.title}
    </div>
  );
}
