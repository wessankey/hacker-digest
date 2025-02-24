export const prompt = `You are tasked with summarizing and analyzing comments on a HackerNews story. Your goal is to provide a concise overview of the discussion, highlight key insights, and determine the overall sentiment of the comments.

Here is the title of the HackerNews story:
<story_title>
{{storyTitle}}
</story_title>

Below are the comments associated with this story. Comments are structured as a JSON list of objects where each object has the following fields:
- 'by': The username of the commenter.
- 'text': The text content of the comment.
- 'time': The timestamp of when the comment was posted, in seconds since the Unix epoch.

<comments>
{{#each comments}}
{{{json this}}}
{{/each}}
</comments>

Please analyze these comments and provide an analysis as a JSON object. Your response MUST include ALL required fields, especially the 'keyInsights' field which is critical and must never be omitted. If you cannot identify enough key insights, include broader observations or patterns as insights instead. The response must contain the following fields:
- 'summary' - array of strings: [REQUIRED] A general summary of the discussion, focusing on the main themes and points of agreement or disagreement among commenters. This should be formatted as an array of strings, each representing a paragraph of the summary. There must be at least two paragraphs.
- 'keyInsights' - array of strings: [REQUIRED] An array of 3-5 strings highlighting key insights or notable opinions expressed in the comments. These should represent the most interesting or impactful points made by commenters. If distinct insights are limited, include:
  - Patterns in how users discuss the topic
  - Common perspectives or assumptions
  - Notable disagreements or debates
  - Interesting questions raised
  - Technical details or examples shared
- 'sentiment' - string: [REQUIRED] An overall sentiment analysis of the comments, categorizing them as either positive, negative, or neutral. Consider the tone, language, and content of the comments when making this determination. This should be either positive, negative, or neutral.
- 'justification' - string: [REQUIRED] A brief explanation of why you chose this sentiment, citing specific examples from the comments.

Remember to base your analysis solely on the provided comments and maintain objectivity in your summary and insights.

Before submitting your response, verify that:
1. All required fields are present, especially 'keyInsights'
2. The 'summary' field is an array of strings.
3. The 'keyInsights' array contains at least 3 items
4. The response is valid JSON

If any of these conditions are not met, revise your response before submitting.`;
