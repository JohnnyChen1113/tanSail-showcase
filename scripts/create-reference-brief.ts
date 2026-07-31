import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import {
  referenceBriefSchema,
  renderReferenceDesignContract,
  renderSiteBrief,
} from "../src/config/reference-brief.ts";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const allowedInputDirectories = [
  path.join(repositoryRoot, "examples/reference"),
  path.join(repositoryRoot, "src/config/generated"),
];
const siteBriefPath = path.join(repositoryRoot, "SITE-BRIEF.md");
const designProposalPath = path.join(repositoryRoot, "DESIGN.proposed.md");

function getArgument(name: string) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv.at(index + 1);
}

function isInside(parent: string, candidate: string) {
  const relative = path.relative(parent, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function resolveInput(requestedPath: string | undefined) {
  if (!requestedPath) throw new Error("Pass an intake with --input <path>.");

  const inputPath = path.resolve(repositoryRoot, requestedPath);
  if (
    path.extname(inputPath) !== ".json" ||
    !allowedInputDirectories.some((directory) => isInside(directory, inputPath))
  ) {
    throw new Error(
      "Reference intake must be JSON under examples/reference or src/config/generated.",
    );
  }

  return inputPath;
}

async function main() {
  const inputPath = resolveInput(getArgument("--input"));
  const source = await readFile(inputPath, "utf8");
  const brief = referenceBriefSchema.parse(JSON.parse(source));
  const siteBrief = renderSiteBrief(brief);
  const designProposal = renderReferenceDesignContract(brief);
  const apply = process.argv.includes("--apply");
  const check = process.argv.includes("--check");

  if (check) {
    const [currentBrief, currentDesign] = await Promise.all([
      readFile(siteBriefPath, "utf8"),
      readFile(designProposalPath, "utf8"),
    ]);
    if (currentBrief !== siteBrief || currentDesign !== designProposal) {
      throw new Error("Reference brief outputs are stale.");
    }
    process.stdout.write("Reference brief outputs are current.\n");
    return;
  }

  if (apply) {
    await Promise.all([
      writeFile(siteBriefPath, siteBrief, "utf8"),
      writeFile(designProposalPath, designProposal, "utf8"),
    ]);
    process.stdout.write("Wrote SITE-BRIEF.md and DESIGN.proposed.md.\n");
    return;
  }

  process.stdout.write(
    `--- SITE-BRIEF.md ---\n${siteBrief}\n--- DESIGN.proposed.md ---\n${designProposal}`,
  );
}

await main();
