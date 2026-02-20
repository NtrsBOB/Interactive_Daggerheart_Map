#!/usr/bin/env node
/**
 * Reads locations.md, parses it (same format as convert.html), and injects
 * the LOCATIONS array into index.html. Run from project root: node build.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname);
const LOCATIONS_MD = path.join(ROOT, "locations.md");
const INDEX_HTML = path.join(ROOT, "index.html");

// Parser logic kept in sync with index.html parseLocationsMd() and convert.html.
function parseLocationsMd(text) {
  const lines = text.trim().split(/\r?\n/);
  const result = [];
  let current = null;
  let category = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const h3 = line.match(/^### (.+)$/);
    const h2 = line.match(/^## (.+)$/);
    const pos = line.match(/^Position:\s*(\d+)\s*,\s*(\d+)/i);

    if (h2) {
      const cat = h2[1].replace(/\s*\([^)]*\)\s*$/, "").trim();
      if (cat && !cat.toLowerCase().startsWith("map legend")) category = cat;
    }
    if (h3) {
      if (current && (current.name || current.description)) {
        current.description = (current.description || "").trim();
        if (current.positions && current.positions.length === 1) {
          current.x = current.positions[0][0];
          current.y = current.positions[0][1];
        } else if (current.positions && current.positions.length > 1) {
          current.points = current.positions;
          current.x = 0;
          current.y = 0;
        }
        delete current.positions;
        if (current.name) result.push(current);
      }
      current = {
        name: h3[1].trim(),
        category: category || "Other",
        x: 0,
        y: 0,
        description: "",
        positions: [],
      };
    } else if (pos && current) {
      current.positions.push([parseInt(pos[1], 10), parseInt(pos[2], 10)]);
    } else if (
      current &&
      line.trim() &&
      !line.startsWith("#") &&
      !line.startsWith("---")
    ) {
      if (current.description) current.description += "\n";
      current.description += line.trim();
    }
  }
  if (current && (current.name || current.description)) {
    current.description = (current.description || "").trim();
    if (current.positions && current.positions.length === 1) {
      current.x = current.positions[0][0];
      current.y = current.positions[0][1];
    } else if (current.positions && current.positions.length > 1) {
      current.points = current.positions;
      current.x = 0;
      current.y = 0;
    }
    delete current.positions;
    if (current.name) result.push(current);
  }

  return result.map((l) => {
    const out = {
      name: l.name,
      category: l.category,
      description: (l.description || "").trim(),
    };
    if (l.points && l.points.length > 1) {
      out.points = l.points;
      out.x = 0;
      out.y = 0;
    } else {
      out.x = l.x || 0;
      out.y = l.y || 0;
    }
    return out;
  });
}

function main() {
  const md = fs.readFileSync(LOCATIONS_MD, "utf8");
  const locations = parseLocationsMd(md);
  const jsonString = JSON.stringify(locations, null, 2);

  let index = fs.readFileSync(INDEX_HTML, "utf8");
  const regex = /(const|let) LOCATIONS = \[[\s\S]*?\];(\s+function parseLocationsMd)/;
  const match = index.match(regex);
  if (!match) {
    console.error("Could not find LOCATIONS array in index.html");
    process.exit(1);
  }
  index = index.replace(regex, `$1 LOCATIONS = ${jsonString};$2`);
  fs.writeFileSync(INDEX_HTML, index, "utf8");
  console.log(`Injected ${locations.length} locations into index.html`);
}

main();
