// Make the AI Judge Laugh: the Office Joke Open.
// Writes one single-line office joke (at most 200 characters) to
// /output/entry.txt. Deterministic: the same joke on every run.
// Self-contained, no network, no input, no secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a specific office detail (Slack status), a setup that sounds
// like a confession, and the payoff landing in the last few words.
const JOKE =
  "I set my Slack status to 'in a meeting' in 2023. No one has questioned it. I've been promoted twice since.";

const MAX_CHARS = 200;

function validate(line: string): void {
  // The gate: UTF-8 text of 1-200 characters, not only whitespace,
  // exactly one line.
  if (!line || !line.trim()) {
    throw new Error("entry is empty or only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  Buffer.from(line, "utf8"); // throws if not valid UTF-8-encodable text
}

function main(): void {
  validate(JOKE);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, "entry.txt");
  writeFileSync(path, JOKE, "utf8");
  console.log(`wrote ${path} (${JOKE.length} chars)`);
}

main();
