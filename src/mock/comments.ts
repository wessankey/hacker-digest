import { TCommentItem } from "@/api/services/hackernews/types";

export const mockComments: Record<string, TCommentItem> = {
  "42342572": {
    by: "mpeg",
    id: 42342572,
    nestedComments: [],
    parent: 42342382,
    text: 'Very useful! I&#x27;ll refer to it when I forget my UUIDs, I use this site all the time to remember my bitcoin private key [0]<p>[0]: <a href="https:&#x2F;&#x2F;privatekeys.pw&#x2F;keys&#x2F;bitcoin&#x2F;1" rel="nofollow">https:&#x2F;&#x2F;privatekeys.pw&#x2F;keys&#x2F;bitcoin&#x2F;1</a>',
  },
  "42342582": {
    by: "animal_spirits",
    id: 42342582,
    parent: 42342382,
    text: "Damn, looks like my db has been leaked",
  },
  "42342595": {
    by: "swyx",
    id: 42342595,
    parent: 42342382,
    text: 'my ref notes on UUID for those interested <a href="https:&#x2F;&#x2F;github.com&#x2F;swyxio&#x2F;brain&#x2F;blob&#x2F;master&#x2F;R%20-%20Dev%20Notes&#x2F;uuid%20list.md?plain=1">https:&#x2F;&#x2F;github.com&#x2F;swyxio&#x2F;brain&#x2F;blob&#x2F;master&#x2F;R%20-%20Dev%20No...</a>',
  },
};
