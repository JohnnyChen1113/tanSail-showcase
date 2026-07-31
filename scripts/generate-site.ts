import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { siteBriefSchema } from "../src/config/brief.ts";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const generatedDirectory = path.join(repositoryRoot, "src/config/generated");

function getArgument(name: string) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv.at(index + 1);
}

function resolveOutputPath(requestedPath: string | undefined) {
  const outputPath = path.resolve(
    repositoryRoot,
    requestedPath ?? "src/config/generated/site.json",
  );
  const relativePath = path.relative(generatedDirectory, outputPath);

  if (
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath) ||
    path.extname(outputPath) !== ".json"
  ) {
    throw new Error("Generated briefs must be JSON files inside src/config/generated/.");
  }

  return outputPath;
}

async function main() {
  const briefPath = getArgument("--brief");
  const outputPath = resolveOutputPath(getArgument("--output"));
  const apply = process.argv.includes("--apply");
  const check = process.argv.includes("--check");

  if (!briefPath) {
    throw new Error("Pass a brief with --brief <path>.");
  }

  const sourcePath = path.resolve(repositoryRoot, briefPath);
  const source = await readFile(sourcePath, "utf8");
  const brief = siteBriefSchema.parse(JSON.parse(source));
  const serialized = `${JSON.stringify(brief, null, 2)}\n`;

  if (check) {
    const current = await readFile(outputPath, "utf8");
    if (JSON.stringify(siteBriefSchema.parse(JSON.parse(current))) !== JSON.stringify(brief))
      throw new Error(`${path.relative(repositoryRoot, outputPath)} is stale.`);
  } else if (apply) {
    await writeFile(outputPath, serialized, "utf8");
  } else {
    process.stdout.write(serialized);
  }

  const unresolved = brief.deployment.domain ? [] : ["production domain"];
  process.stderr.write(
    `Validated ${brief.brand.name}: ${brief.pages.length} page(s), ${brief.recipe}, ${brief.preset}.\n`,
  );
  if (unresolved.length > 0) process.stderr.write(`Unresolved: ${unresolved.join(", ")}\n`);
}

await main();
