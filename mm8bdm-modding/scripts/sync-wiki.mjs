#!/usr/bin/env node
/**
 * Maintainer-only: sync English MM8BDM wiki modding sections into
 * mm8bdm-modding/references/. Does not run during agent sessions.
 *
 * Usage:
 *   node scripts/sync-wiki.mjs [wikiRoot]
 *
 * If wikiRoot is omitted, search nearby trees for a directory that matches
 * the English wiki fingerprint (Notion-id folder names + English ACS README).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.resolve(__dirname, "..");
const DEST = path.join(SKILL_ROOT, "references");

const SECTIONS = [
  "starting-guides-77c9d72f",
  "interacting-with-systems-c99b6cab",
  "acs-script-reference-cf6aec3f",
  "decorate-actor-reference-2fdd3e69",
  "mapping-reference-3fe89cb4",
  "additional-guides-7149f7a8",
];

const ACS_MARKER = "acs-script-reference-cf6aec3f";
const CLASSBASE_MARKER = path.join(
  "decorate-actor-reference-2fdd3e69",
  "classbase-c7f9de44.md",
);
const ENGLISH_SNIPPET =
  "This page serves as a list of all the useful scripts";

function isWikiRoot(dir) {
  const acsReadme = path.join(dir, ACS_MARKER, "README.md");
  const classbase = path.join(dir, CLASSBASE_MARKER);
  if (!fs.existsSync(acsReadme) || !fs.existsSync(classbase)) return false;
  try {
    const text = fs.readFileSync(acsReadme, "utf8");
    return text.includes(ENGLISH_SNIPPET);
  } catch {
    return false;
  }
}

function walkFind(start, maxDepth, predicate) {
  const hits = [];
  function visit(dir, depth) {
    if (depth > maxDepth) return;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    if (predicate(dir)) hits.push(dir);
    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      const name = ent.name;
      if (name === ".git" || name === "node_modules" || name === "assets") continue;
      visit(path.join(dir, name), depth + 1);
    }
  }
  visit(start, 0);
  return hits;
}

function discoverWikiRoots() {
  const starts = [];
  if (process.env.MM8BDM_WIKI) {
    starts.push(path.resolve(process.env.MM8BDM_WIKI));
  }
  // Skill → mm8bdm-skills → parent (often mm8bdm/) and a few levels up
  let cur = SKILL_ROOT;
  for (let i = 0; i < 5; i++) {
    starts.push(cur);
    const parent = path.dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  const cwd = process.cwd();
  if (!starts.includes(cwd)) starts.push(cwd);

  const found = new Set();
  for (const start of starts) {
    if (!fs.existsSync(start)) continue;
    // Candidate may already be the output root
    if (isWikiRoot(start)) found.add(path.resolve(start));
    // Or an exporter repo / parent that contains output/
    const nested = walkFind(start, 4, (dir) => {
      const base = path.basename(dir);
      // Prefer directories that look like export roots without requiring the name
      return isWikiRoot(dir);
    });
    for (const h of nested) found.add(path.resolve(h));
  }
  return [...found];
}

function copyMarkdownTree(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const ent of entries) {
    const src = path.join(srcDir, ent.name);
    const dest = path.join(destDir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "assets") continue;
      copyMarkdownTree(src, dest);
      continue;
    }
    if (!ent.isFile()) continue;
    if (!ent.name.toLowerCase().endsWith(".md")) continue;
    fs.copyFileSync(src, dest);
  }
}

function sync(wikiRoot) {
  if (!isWikiRoot(wikiRoot)) {
    console.error(`Not a valid English wiki root: ${wikiRoot}`);
    process.exit(1);
  }

  fs.mkdirSync(DEST, { recursive: true });

  // Remove previous section snapshots only (keep rage-rune.md etc.)
  for (const section of SECTIONS) {
    const destSection = path.join(DEST, section);
    if (fs.existsSync(destSection)) {
      fs.rmSync(destSection, { recursive: true, force: true });
    }
    const srcSection = path.join(wikiRoot, section);
    if (!fs.existsSync(srcSection)) {
      console.warn(`Missing section (skipped): ${section}`);
      continue;
    }
    copyMarkdownTree(srcSection, destSection);
    console.log(`Synced ${section}`);
  }

  // Rewrite image links that pointed at ../assets/ — assets are not vendored
  stripBrokenAssetLinks(DEST);

  const stamp = {
    syncedAt: new Date().toISOString(),
    source: path.resolve(wikiRoot),
    sections: SECTIONS,
  };
  fs.writeFileSync(
    path.join(DEST, "_sync-meta.json"),
    JSON.stringify(stamp, null, 2) + "\n",
    "utf8",
  );
  console.log(`Done → ${DEST}`);
}

function stripBrokenAssetLinks(root) {
  function visit(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        visit(p);
        continue;
      }
      if (!ent.name.endsWith(".md")) continue;
      let text = fs.readFileSync(p, "utf8");
      const next = text
        .replace(/!\[[^\]]*\]\(\.\.\/assets\/[^)]+\)/g, "<!-- image omitted (assets not vendored) -->")
        .replace(/!\[[^\]]*\]\(assets\/[^)]+\)/g, "<!-- image omitted (assets not vendored) -->");
      if (next !== text) fs.writeFileSync(p, next, "utf8");
    }
  }
  visit(root);
}

function main() {
  const arg = process.argv[2];
  if (arg) {
    sync(path.resolve(arg));
    return;
  }
  const hits = discoverWikiRoots();
  if (hits.length === 0) {
    console.error(
      "Could not find English MM8BDM wiki export.\n" +
        "Pass the path to the directory that contains acs-script-reference-cf6aec3f/,\n" +
        "or set MM8BDM_WIKI to that directory (or its parent).",
    );
    process.exit(1);
  }
  if (hits.length > 1) {
    console.error("Multiple wiki roots found; pass one explicitly:");
    for (const h of hits) console.error(`  ${h}`);
    process.exit(1);
  }
  console.log(`Using wiki root: ${hits[0]}`);
  sync(hits[0]);
}

main();
