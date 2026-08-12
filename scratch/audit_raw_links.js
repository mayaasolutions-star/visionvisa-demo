const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'brain' || file === 'out' || file === 'scratch') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('.');
const rawLinks = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (/<a\s+[^>]*href=["']\/[a-z0-9]/i.test(l)) {
      rawLinks.push({ file: f, line: i + 1, content: l.trim() });
    }
  });
});

console.log(`Found ${rawLinks.length} raw <a href="/..."> links across the codebase:\n`);
rawLinks.forEach(item => {
  console.log(`${item.file}:${item.line} -> ${item.content}`);
});
