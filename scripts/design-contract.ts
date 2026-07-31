import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import {
  TailwindV4EmitterHandler,
  lint,
  serializeTailwindV4,
  type Finding,
} from "@google/design.md/linter";

const contractUrl = new URL("../DESIGN.md", import.meta.url);
const generatedThemeUrl = new URL("../src/styles/design.generated.css", import.meta.url);

export type DesignContractReport = {
  errors: string[];
  warnings: string[];
  sections: string[];
};

function formatFinding(finding: Finding) {
  const location = finding.path ? `${finding.path}: ` : "";
  return `${location}${finding.message}`;
}

export function validateDesignContract(source: string): DesignContractReport {
  const report = lint(source);

  return {
    errors: report.findings.filter(({ severity }) => severity === "error").map(formatFinding),
    warnings: report.findings.filter(({ severity }) => severity === "warning").map(formatFinding),
    sections: report.sections,
  };
}

export function renderDesignTheme(source: string) {
  const report = lint(source);
  const errors = report.findings.filter(({ severity }) => severity === "error");

  if (errors.length > 0) {
    throw new Error(errors.map(formatFinding).join("\n"));
  }

  const result = new TailwindV4EmitterHandler().execute(report.designSystem);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return `/* Generated from DESIGN.md. Run \`pnpm design:export\` after token changes. */\n${serializeTailwindV4(result.data.theme)}`;
}

async function loadContract() {
  return readFile(contractUrl, "utf8");
}

async function lintContract() {
  const report = validateDesignContract(await loadContract());
  const output = JSON.stringify(report, null, 2);

  if (report.errors.length > 0) {
    throw new Error(output);
  }

  process.stdout.write(`${output}\n`);
}

async function exportContract() {
  const theme = renderDesignTheme(await loadContract());
  await writeFile(generatedThemeUrl, theme, "utf8");
  process.stdout.write(`Wrote ${fileURLToPath(generatedThemeUrl)}\n`);
}

async function checkContract() {
  const expected = renderDesignTheme(await loadContract());
  const actual = await readFile(generatedThemeUrl, "utf8").catch(() => "");

  if (actual !== expected) {
    throw new Error("DESIGN.md and src/styles/design.generated.css are out of sync.");
  }

  await lintContract();
}

async function main() {
  const command = process.argv[2] ?? "lint";

  if (command === "lint") {
    await lintContract();
    return;
  }

  if (command === "export") {
    await exportContract();
    return;
  }

  if (command === "check") {
    await checkContract();
    return;
  }

  throw new Error(`Unknown design-contract command: ${command}`);
}

const isDirectExecution = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectExecution) {
  await main();
}
