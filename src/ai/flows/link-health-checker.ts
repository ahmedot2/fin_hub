'use server';

/**
 * @fileOverview Automatically verifies the health of URLs weekly, flags broken links, updates the verification timestamp, and uses GenAI to summarize the content of the page.
 *
 * - linkHealthChecker - A function that handles the link health check process.
 * - LinkHealthCheckerInput - The input type for the linkHealthChecker function.
 * - LinkHealthCheckerOutput - The return type for the linkHealthChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LinkHealthCheckerInputSchema = z.object({
  url: z.string().url().describe('The URL to check.'),
});
export type LinkHealthCheckerInput = z.infer<typeof LinkHealthCheckerInputSchema>;

const LinkHealthCheckerOutputSchema = z.object({
  healthy: z.boolean().describe('Whether the URL is healthy or not.'),
  statusCode: z.number().describe('The HTTP status code of the URL.'),
  summary: z.string().describe('A short summary of the content of the page.'),
  lastVerified: z.number().describe('The timestamp of the last verification.'),
});
export type LinkHealthCheckerOutput = z.infer<typeof LinkHealthCheckerOutputSchema>;

export async function linkHealthChecker(input: LinkHealthCheckerInput): Promise<LinkHealthCheckerOutput> {
  return linkHealthCheckerFlow(input);
}

const summarizeContent = ai.definePrompt({
  name: 'summarizeContent',
  input: {
    schema: z.object({
      url: z.string().url(),
      content: z.string(),
    }),
  },
  output: {schema: z.object({summary: z.string()})},
  prompt: `Summarize the content of this page in less than 20 words.\nURL: {{{url}}}\nContent: {{{content}}}`,
});

const linkHealthCheckerFlow = ai.defineFlow(
  {
    name: 'linkHealthCheckerFlow',
    inputSchema: LinkHealthCheckerInputSchema,
    outputSchema: LinkHealthCheckerOutputSchema,
  },
  async input => {
    try {
      const response = await fetch(input.url);
      const statusCode = response.status;
      const healthy = statusCode >= 200 && statusCode < 300;
      let summary = 'Unable to fetch summary.';

      if (healthy) {
        const content = await response.text();
        const {output} = await summarizeContent({
          url: input.url,
          content,
        });
        summary = output!.summary;
      }

      const lastVerified = Date.now();

      return {healthy, statusCode, summary, lastVerified};
    } catch (error: any) {
      console.error(`Error checking link ${input.url}:`, error);
      return {
        healthy: false,
        statusCode: 0,
        summary: 'Failed to check link.',
        lastVerified: Date.now(),
      };
    }
  }
);
