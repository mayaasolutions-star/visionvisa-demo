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
const allHrefs = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (/href\s*=\s*/i.test(l)) {
      allHrefs.push({ file: f, line: i + 1, content: l.trim() });
    }
  });
});

console.log(`Found ${allHrefs.length} total href references across the codebase:\n`);
allHrefs.forEach(item => {
  console.log(`${item.file}:${item.line} -> ${item.content}`);
});
