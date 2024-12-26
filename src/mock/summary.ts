import { CommentSummary } from "@/api/commentSummary";

export const commentSummary: CommentSummary = {
  summary:
    "The discussion around OpenAI's Sora release reveals a complex mix of technical critique, ethical concerns, and practical limitations. Many users expressed frustration with access issues and OpenAI's rollout strategy. There was significant debate about the quality of the generated videos, with some noting impressive capabilities while others pointed out obvious flaws in physics and consistency. A major theme was concern about societal implications, including potential misuse for disinformation and the impact on creative industries. Technical users discussed limitations like GPU costs and lack of API access, while others focused on comparison with existing solutions like HunyuanVideo.",
  keyInsights: [
    "The computational cost of running Sora at scale is extremely high - one commenter noted that generating a 5-second video requires 5 minutes on 8xH100 GPUs, making mass adoption potentially very expensive",
    "Many users identified consistent issues with physics and temporal consistency in the generated videos, particularly with things like footprints, water movement, and object interactions",
    "There's significant concern about the societal impact, particularly regarding disinformation and the need for proper labeling/watermarking of AI-generated content",
    "The lack of API access and limited availability (especially in EU/UK) suggests OpenAI may be shifting from an infrastructure company to a product company",
  ],
  sentiment: "negative",
  justification:
    'The overall sentiment is predominantly negative, evidenced by: 1) Numerous complaints about access issues and OpenAI\'s rollout strategy ("can\'t even log in", "account creation unavailable"), 2) Widespread criticism of the output quality ("weird uncanny valley effects", "shitty", "garbage quality"), 3) Strong concerns about societal implications ("enshitification of everything", "dead internet theory becoming more prevalent"), 4) Frustration with pricing and technical limitations. While there are some positive comments about the technical achievement, they are significantly outnumbered by critical and concerned responses.',
};
