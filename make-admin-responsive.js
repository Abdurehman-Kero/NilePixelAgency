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

const files = walk('frontend/src/pages/admin');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Make forms responsive
  content = content.replace(/className="grid grid-cols-2 gap-4"/g, 'className="grid grid-cols-1 sm:grid-cols-2 gap-4"');
  content = content.replace(/className="grid grid-cols-3 gap-4"/g, 'className="grid grid-cols-1 sm:grid-cols-3 gap-4"');
  content = content.replace(/className="grid grid-cols-3 gap-3"/g, 'className="grid grid-cols-1 sm:grid-cols-3 gap-3"');
  content = content.replace(/className="grid grid-cols-2 gap-6"/g, 'className="grid grid-cols-1 sm:grid-cols-2 gap-6"');
  content = content.replace(/className="grid grid-cols-2 gap-6 text-sm"/g, 'className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm"');

  // Make page headers responsive
  content = content.replace(/className="flex items-center justify-between"/g, 'className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"');

  // Make tables responsive (prevent overflow)
  content = content.replace(/<div className="bg-\[#101C2F\] border border-\[#23344F\] rounded-2xl overflow-hidden">\s+<table/g, '<div className="bg-[#101C2F] border border-[#23344F] rounded-2xl overflow-hidden overflow-x-auto">\n            <table');

  // Catch cases where spacing is a bit different
  content = content.replace(/className="bg-\[#101C2F\] border border-\[#23344F\] rounded-2xl overflow-hidden"/g, 'className="bg-[#101C2F] border border-[#23344F] rounded-2xl overflow-hidden overflow-x-auto"');

  // But we need to make sure we don't accidentally double add it if we run it again
  content = content.replace(/overflow-hidden overflow-x-auto overflow-x-auto/g, 'overflow-hidden overflow-x-auto');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated:', file);
  }
});
