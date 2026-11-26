import { mkdirSync, writeFileSync } from "node:fs";

// One office joke, one line, deterministic across runs.
const JOKE =
  "The office printer only jams on urgent documents \u2014 I stopped calling IT and started inviting it to the meeting instead.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE + "\n", "utf8");
