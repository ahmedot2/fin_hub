'use server';

import {
  linkHealthChecker,
  type LinkHealthCheckerInput,
  type LinkHealthCheckerOutput,
} from '@/ai/flows/link-health-checker';

export async function checkLinkHealth(url: string): Promise<LinkHealthCheckerOutput> {
  const input: LinkHealthCheckerInput = { url };
  try {
    const result = await linkHealthChecker(input);
    return result;
  } catch (error) {
    console.error(`Error in linkHealthChecker for URL: ${url}`, error);
    return {
      healthy: false,
      statusCode: 0,
      summary: 'An unexpected error occurred during verification.',
      lastVerified: Date.now(),
    };
  }
}
