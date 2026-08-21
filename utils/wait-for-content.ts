import { expect } from "@playwright/test";

const CONTENT_POLL_OPTIONS = {
  intervals: [1_000],
  message: "Content should be available within 30 seconds",
  timeout: 30_000,
};

export async function waitForContent<T>(
  contentGetter: () => Promise<T | undefined>,
): Promise<T> {
  let content: T | undefined;

  async function pollForContent(): Promise<boolean> {
    content = await contentGetter();

    return content !== undefined;
  }

  await expect.poll(pollForContent, CONTENT_POLL_OPTIONS).toBe(true);

  if (content === undefined) {
    throw new Error("Content was not collected.");
  }

  return content;
}
