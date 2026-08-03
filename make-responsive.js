const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('frontend/src');

const replacements = [
  { from: /\bpx-8 py-4\b/g, to: 'px-5 py-2.5 sm:px-8 sm:py-4' },
  { from: /\bpx-8 py-3\.5\b/g, to: 'px-5 py-2 sm:px-8 sm:py-3.5' },
  { from: /\bpx-6 py-3\b/g, to: 'px-4 py-2 sm:px-6 sm:py-3' },
  { from: /\bpx-6 py-2\b/g, to: 'px-4 py-1.5 sm:px-6 sm:py-2' },
  { from: /\bpx-5 py-2\.5\b/g, to: 'px-3 py-1.5 sm:px-5 sm:py-2.5' },
  { from: /\bpx-4 py-2\.5\b/g, to: 'px-3 py-1.5 sm:px-4 sm:py-2.5' },
  { from: /\bpx-4 py-2\b/g, to: 'px-3 py-1.5 sm:px-4 sm:py-2' },
  { from: /\bpx-4 py-1\.5\b/g, to: 'px-3 py-1 sm:px-4 sm:py-1.5' },
];

let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    changedFiles++;
    console.log('Updated:', file);
  }
});

console.log(`Updated ${changedFiles} files.`);
