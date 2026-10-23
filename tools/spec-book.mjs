// Writes the specification as a book: site/content/spec.md is its main page, with `chapters:
// spec`, and site/content/spec/<chapter>.md is each top-level section, served at
// /page/spec/<chapter> (the engine's books, parkscomputing Architecture/books-design.md). The
// source is the `spec` submodule, so the book is the specification at the tag it is pinned to.
//
// The text is the specification's own. Three things are added: each "section N" or "section N.M"
// becomes a link to that section's chapter and heading, each diagnostic code becomes a link to its
// page in the diagnostics book, and the grammar file is a chapter of its own.
//
//   npm run spec

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const SPEC_TAG = "v1.0.0-draft.1";
const SPEC_URL = `https://github.com/paulmooreparks/xferlang/blob/${SPEC_TAG}`;
const DATE = "2026-10-23T00:00:00";

const spec = read("spec/spec/xferlang.md").replace(/\r\n/g, "\n");
const grammar = read("spec/spec/xferlang.abnf").replace(/\r\n/g, "\n");

// ---- Split at the top-level sections ----

const lines = spec.split("\n");
const firstSection = lines.findIndex((l) => l.startsWith("## "));
const preamble = lines.slice(0, firstSection);
const chapters = [];
for (let i = firstSection; i < lines.length; i++) {
  if (lines[i].startsWith("## ")) {
    chapters.push({ heading: lines[i].slice(3), body: [] });
  } else {
    chapters.at(-1).body.push(lines[i]);
  }
}

// A chapter's file name, which is its address: the heading's words without its number.
const fileName = (heading) =>
  heading
    .replace(/^(\d+|Appendix [A-Z])\.\s*/, "")
    .replace(/\(.*?\)/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/ +/g, "-");

// A heading's id as the engine writes it, in the GitHub style.
const anchor = (heading) =>
  heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N} -]/gu, "")
    .replace(/ /g, "-");

// Section number to its chapter and anchor, for the cross-references.
const sections = new Map();
for (const chapter of chapters) {
  chapter.file = fileName(chapter.heading);
  const number = /^(\d+)\./.exec(chapter.heading)?.[1];
  if (number) {
    sections.set(number, { file: chapter.file, anchor: null });
  }
  for (const line of chapter.body) {
    const m = /^### (\d+\.\d+) (.+)$/.exec(line);
    if (m) {
      sections.set(m[1], { file: chapter.file, anchor: anchor(`${m[1]} ${m[2]}`) });
    }
  }
}

// ---- Links, outside code ----

/** Applies f to the prose of a line: the parts outside inline code spans. */
function outsideCode(line, f) {
  return line
    .split(/(`[^`]*`)/)
    .map((part) => (part.startsWith("`") ? part : f(part)))
    .join("");
}

function link(text) {
  let out = text.split("\n");
  let fenced = false;
  out = out.map((line) => {
    if (line.startsWith("```")) {
      fenced = !fenced;
      return line;
    }
    if (fenced || line.startsWith("#")) {
      return line;
    }
    // A code in backticks or bare, but not in a table's code column, which links it anyway.
    line = line.replace(/`(XFER\d{4})`/g, "[`$1`](/page/diag/$1)");
    line = line.replace(/^\| (XFER\d{4}) \|/, "| [$1](/page/diag/$1) |");
    return outsideCode(line, (prose) =>
      prose.replace(/\bsections? (\d+(?:\.\d+)?)\b/g, (whole, number) => {
        const target = sections.get(number);
        if (!target) {
          throw new Error(`the specification refers to section ${number}, which it does not have`);
        }
        return `[${whole}](/page/spec/${target.file}${target.anchor ? `#${target.anchor}` : ""})`;
      }),
    );
  });
  return out.join("\n");
}

// ---- The pages ----

const front = (title, description, extra = []) => [
  "---",
  `title: "${title.replaceAll('"', "'")}"`,
  `description: "${description.replaceAll('"', "'")}"`,
  ...extra,
  `date: ${DATE}`,
  `lastModified: ${DATE}`,
  "lang: en-us",
  "---",
];

const folder = new URL("site/content/spec/", root);
rmSync(folder, { recursive: true, force: true });
mkdirSync(folder, { recursive: true });

chapters.forEach((chapter, i) => {
  // The section's own headings move up one level, so the chapter's title is its first heading.
  const body = chapter.body.map((l) => (l.startsWith("### ") ? l.slice(1) : l)).join("\n").trim();
  const text = [
    ...front(chapter.heading, `The XferLang specification, ${chapter.heading}`, [`order: ${i + 1}`]),
    `# ${chapter.heading}`,
    "",
    link(body),
    "",
  ].join("\n");
  writeFileSync(new URL(`${chapter.file}.md`, folder), text);
});

writeFileSync(
  new URL("grammar.md", folder),
  [
    ...front("Grammar", "The XferLang grammar in ABNF", [`order: ${chapters.length + 1}`]),
    "# Grammar",
    "",
    "The grammar of XferLang in ABNF (RFC 5234), from `spec/xferlang.abnf`. Where it and the prose disagree, the disagreement is a defect in both, and a conformance case decides between them.",
    "",
    "```abnf",
    grammar.trimEnd(),
    "```",
    "",
  ].join("\n"),
);

// The main page: the specification's title and status, then the chapters as the engine lists them.
const title = preamble.find((l) => l.startsWith("# ")).slice(2);
const intro = preamble.filter((l) => !l.startsWith("# ")).join("\n").trim();
writeFileSync(
  new URL("site/content/spec.md", root),
  [
    ...front(title, "The XferLang specification, the contract every implementation is tested against", ["chapters: spec"]),
    `# ${title}`,
    "",
    link(intro),
    "",
    `This book is the specification at \`${SPEC_TAG}\`, from [its repository](${SPEC_URL}/spec/xferlang.md), which also holds the [conformance suite](${SPEC_URL}/tests). Each diagnostic code in it links to its page in the [diagnostic codes](/page/diag).`,
    "",
  ].join("\n"),
);

console.log(`wrote the specification as a book of ${chapters.length + 1} chapters`);
