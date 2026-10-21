// Writes the page for each diagnostic code, site/content/diag-XFERnnnn.md, and the index of them,
// site/content/diag.md, from three sources so that no page can disagree with the language:
//
//   spec/spec/xferlang.md       each code's severity and summary (section 10), and the headings
//                               of the sections the pages link to
//   tools/diagnostics.xfer      the hand-written part: the section, what the code means, the fix
//   spec/tests/                 the conformance suite's cases, for each code's example
//
// The diagnostic an example shows is computed by xfer-js, in the format `xfer validate` prints it.
//
//   npm run diag

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { canonical, fromJson, parse, toJson } from "xferlang";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const SPEC_TAG = "v1.0.0-draft.1";
const SPEC_URL = `https://github.com/paulmooreparks/xferlang/blob/${SPEC_TAG}`;
// The date the pages carry, so that running this again changes nothing unless a source changed.
const DATE = "2026-10-22T00:00:00";

// ---- The specification ----

const spec = read("spec/spec/xferlang.md");
const codes = [];
for (const m of spec.matchAll(/^\| (XFER\d{4}) \| (error|warning|informational) \| (.+) \|$/gm)) {
  codes.push({ code: m[1], severity: m[2], summary: m[3] });
}
if (codes.length < 40) {
  throw new Error(`found only ${codes.length} codes in the specification's table`);
}

// Section number to heading, and its anchor as GitHub writes it.
const sections = new Map();
for (const m of spec.matchAll(/^#{2,3} ((\d+)(\.\d+)?)\.? (.+)$/gm)) {
  const heading = `${m[1]}${m[3] ? "" : "."} ${m[4]}`;
  const anchor = heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N} -]/gu, "")
    .replace(/ /g, "-");
  sections.set(m[1], { title: m[4], anchor });
}

// ---- The hand-written part, in XferLang ----

const notesResult = parse(read("tools/diagnostics.xfer"));
if (!notesResult.ok) {
  throw new Error(`tools/diagnostics.xfer: ${notesResult.diagnostics.map((d) => d.message).join("; ")}`);
}
const notes = new Map();
for (const [code, entry] of notesResult.value.entries) {
  const fields = Object.fromEntries([...entry.entries].map(([k, v]) => [k, v.value]));
  notes.set(code, fields);
}
for (const { code } of codes) {
  if (!notes.has(code)) {
    throw new Error(`tools/diagnostics.xfer has no entry for ${code}`);
  }
}

// ---- The conformance suite ----

function txtar(name) {
  const files = new Map();
  let current;
  let body = [];
  const lines = read(`spec/tests/${name}`).split("\n");
  const flush = () => current !== undefined && files.set(current, body.join(""));
  lines.forEach((line, i) => {
    const m = /^-- (.+?) --$/.exec(line);
    if (m) {
      flush();
      current = m[1];
      body = [];
    } else if (current !== undefined) {
      body.push(i === lines.length - 1 ? line : `${line}\n`);
    }
  });
  flush();
  return files;
}

/** Each case of an archive: its stem and its files by suffix. */
function cases(name, suffixes) {
  const byStem = new Map();
  for (const [file, text] of txtar(name)) {
    const suffix = suffixes.find((s) => file.endsWith(s));
    if (suffix) {
      const stem = file.slice(0, -suffix.length);
      if (!byStem.has(stem)) {
        byStem.set(stem, new Map());
      }
      byStem.get(stem).set(suffix, text);
    }
  }
  return byStem;
}

const firstCodes = (diag) => (diag ?? "").split("\n").filter(Boolean).map((l) => l.split(" ")[0]);

// For each code, the suite's cases that list it, in each archive, with what an example needs.
const examples = new Map();
const add = (code, item) => {
  if (!examples.has(code)) {
    examples.set(code, []);
  }
  examples.get(code).push(item);
};
for (const [stem, files] of cases("invalid.txtar", [".xfer", ".diag"])) {
  for (const code of firstCodes(files.get(".diag"))) {
    add(code, { kind: "parse", id: `invalid/${stem}`, archive: "invalid.txtar", input: files.get(".xfer") });
  }
}
for (const [stem, files] of cases("to-json.txtar", [".xfer", ".json", ".diag", ".options"])) {
  const big = (files.get(".options") ?? "").includes("stringify-big-ints");
  for (const code of firstCodes(files.get(".diag"))) {
    add(code, { kind: "to-json", id: `to-json/${stem}`, archive: "to-json.txtar", input: files.get(".xfer"), big });
  }
}
for (const [stem, files] of cases("from-json.txtar", [".json", ".xfer", ".diag"])) {
  for (const code of firstCodes(files.get(".diag"))) {
    add(code, { kind: "from-json", id: `from-json/${stem}`, archive: "from-json.txtar", input: files.get(".json") });
  }
}
for (const name of readdirSync(new URL("spec/tests/bytes/", root))) {
  if (name.endsWith(".diag")) {
    for (const code of firstCodes(read(`spec/tests/bytes/${name}`))) {
      add(code, { kind: "bytes", id: `bytes/${name.slice(0, -5)}`, archive: `bytes/${name}` });
    }
  }
}

// ---- What the CLI prints ----

/** A diagnostic as `xfer validate` prints it, or with --json as one JSON line. */
function line(file, d, json) {
  return json
    ? JSON.stringify({ file, ...d })
    : `${file}:${d.start.line}:${d.start.column}: ${d.severity} ${d.code}: ${d.message}`;
}

/** The commands and output of an example from the suite, or null when it has no printable document. */
function render(example, code) {
  const info = codes.find((c) => c.code === code).severity === "informational";
  const json = info; // informational diagnostics are printed only with --json
  const flag = json ? " --json" : "";
  switch (example.kind) {
    case "parse": {
      const result = parse(example.input);
      const out = result.diagnostics.map((d) => line("example.xfer", d, json)).join("\n");
      return { lang: "xfer", input: example.input, command: `xfer validate${flag} example.xfer`, output: out };
    }
    case "to-json": {
      const result = parse(example.input);
      const converted = toJson(result.value, { stringifyBigInts: example.big });
      const diags = converted.diagnostics.filter((d) => json || d.severity !== "informational");
      const out = [converted.text, ...diags.map((d) => line("example.xfer", d, json))].join("\n");
      const big = example.big ? " --stringify-big-ints" : "";
      return { lang: "xfer", input: example.input, command: `xfer to-json${big}${flag} example.xfer`, output: out };
    }
    case "from-json": {
      const converted = fromJson(example.input);
      const text = converted.value === undefined ? [] : [canonical(converted.value).trimEnd()];
      const diags = converted.diagnostics.map((d) => line("example.json", d, json));
      return { lang: "json", input: example.input, command: `xfer from-json${flag} example.json`, output: [...text, ...diags].join("\n") };
    }
    default:
      return null; // byte-exact cases (invalid UTF-8, very deep nesting) have no document to show
  }
}

// ---- The pages ----

const fence = (lang, text) => `\`\`\`${lang}\n${text.endsWith("\n") ? text : `${text}\n`}\`\`\``;
const severityWord = { error: "Error", warning: "Warning", informational: "Informational" };

function page({ code, severity, summary }) {
  const note = notes.get(code);
  const section = sections.get(note.section);
  if (!section) {
    throw new Error(`${code}: tools/diagnostics.xfer names section ${note.section}, which the specification does not have`);
  }
  const found = (examples.get(code) ?? []).sort((a, b) => (a.input?.length ?? 1e9) - (b.input?.length ?? 1e9));
  const shown = found.map((e) => ({ e, r: render(e, code) })).find((x) => x.r !== null);
  const parts = [
    "---",
    `title: "${code}: ${summary.replaceAll('"', "'")}"`,
    `description: "${severityWord[severity]}: ${summary.replaceAll('"', "'")}."`,
    `date: ${DATE}`,
    `lastModified: ${DATE}`,
    "lang: en-us",
    "---",
    `# ${code}`,
    "",
    `**${severityWord[severity]}.** ${summary[0].toUpperCase()}${summary.slice(1)}.`,
    "",
    "## What it means",
    "",
    note.meaning,
    "",
  ];
  if (shown) {
    parts.push("## An example", "", `From the conformance suite, \`${shown.e.id}\`:`, "", fence(shown.r.lang, shown.r.input), "", fence("", `$ ${shown.r.command}\n${shown.r.output}`), "");
  } else if (note.example !== undefined) {
    parts.push("## An example", "", fence("xfer", note.example), "", note.exampleNote ?? "", "");
  }
  parts.push("## How to fix it", "", note.fix, "", "## In the specification", "");
  parts.push(`Section ${note.section}, [${section.title}](${SPEC_URL}/spec/xferlang.md#${section.anchor}), of the specification at \`${SPEC_TAG}\`.`, "");
  if (found.length > 0) {
    const ids = [...new Set(found.map((e) => e.id))].sort();
    parts.push("## Conformance cases", "", `The suite's cases that expect ${code}:`, "");
    for (const id of ids) {
      const archive = found.find((e) => e.id === id).archive;
      parts.push(`- [\`${id}\`](${SPEC_URL}/tests/${archive})`);
    }
    parts.push("");
  }
  parts.push("[All diagnostic codes](/diag)", "");
  return parts.join("\n");
}

for (const entry of codes) {
  writeFileSync(new URL(`site/content/diag-${entry.code}.md`, root), page(entry));
}

const index = [
  "---",
  'title: "Diagnostic codes"',
  `description: "Every diagnostic an XferLang implementation reports, by code."`,
  `date: ${DATE}`,
  `lastModified: ${DATE}`,
  "lang: en-us",
  "---",
  "# Diagnostic codes",
  "",
  `Every fault an XferLang parser, writer, converter or object mapper reports has a code from the specification (section 10 at \`${SPEC_TAG}\`). The code is stable: it never changes meaning, and every implementation reports the same code for the same fault. Each code has a page with an example and the fix.`,
  "",
  "| Code | Severity | Meaning |",
  "|---|---|---|",
  ...codes.map((c) => `| [${c.code}](/diag/${c.code}) | ${c.severity} | ${c.summary} |`),
  "",
].join("\n");
writeFileSync(new URL("site/content/diag.md", root), index);
console.log(`wrote ${codes.length} diagnostic pages and the index`);
