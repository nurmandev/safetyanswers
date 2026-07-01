/**
 * remove-border-radius.js
 * Strips all Tailwind rounded-* utility classes from every .tsx file
 * under src/app/admin/ and src/components/admin/
 *
 * Run with: node remove-border-radius.js
 */

const fs = require("fs");
const path = require("path");

// Tailwind rounded utilities to remove (order: longest first to avoid partial matches)
const ROUNDED_PATTERN =
  /\s?rounded-(none|sm|md|lg|xl|2xl|3xl|full|tl-\w+|tr-\w+|bl-\w+|br-\w+|t-\w+|b-\w+|l-\w+|r-\w+|\[\w+\])/g;

// Also remove bare `rounded` with no suffix
const BARE_ROUNDED_PATTERN = /(?<![a-z-])rounded(?![-\[])/g;

// Directories to scan
const TARGET_DIRS = [
  path.join(__dirname, "src", "app", "admin"),
  path.join(__dirname, "src", "components", "admin"),
];

let totalFiles = 0;
let modifiedFiles = 0;

function processFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");

  let updated = original
    .replace(ROUNDED_PATTERN, "")
    .replace(BARE_ROUNDED_PATTERN, "");

  // Clean up double spaces left behind inside className strings
  updated = updated.replace(/  +/g, " ");

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`  ✓ Updated: ${path.relative(__dirname, filePath)}`);
    modifiedFiles++;
  }

  totalFiles++;
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`  ⚠ Directory not found, skipping: ${dir}`);
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      processFile(fullPath);
    }
  }
}

console.log("\n🔧  Removing all Tailwind rounded-* classes from admin files...\n");

for (const dir of TARGET_DIRS) {
  console.log(`📂 Scanning: ${dir}`);
  walkDir(dir);
}

console.log(
  `\n✅  Done — scanned ${totalFiles} file(s), modified ${modifiedFiles} file(s).\n`
);
