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

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix chained replacements
  content = content.replace(/\bpx-3 py-1\.5 sm:px-4 sm:py-2 sm:px-6 sm:py-3\b/g, 'px-4 py-2 sm:px-6 sm:py-3');
  content = content.replace(/\bpx-3 py-1\.5 sm:px-5 sm:py-2\.5 sm:px-8 sm:py-4\b/g, 'px-5 py-2.5 sm:px-8 sm:py-4');
  content = content.replace(/\bpx-3 py-1\.5 sm:px-4 sm:py-2 sm:px-8 sm:py-3\.5\b/g, 'px-5 py-2 sm:px-8 sm:py-3.5');
  
  // Specific button in ContactPage: "w-full py-3.5" to "w-full py-2.5 sm:py-3.5"
  content = content.replace(/\bw-full py-3\.5\b/g, 'w-full py-2.5 sm:py-3.5');
  
  // Clean up any double spaces
  content = content.replace(/  +/g, ' ');

  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});
