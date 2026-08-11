const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (file.endsWith('.jsx')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

const rootDir = 'D:/PROFESSIONAL/Mayaa Industries/Clients/Vision Visa/VisionVisa/visionvisa.in';
const files = [...getAllFiles(rootDir + '/app'), ...getAllFiles(rootDir + '/components')];

console.log(`Analyzing nesting in ${files.length} JSX files...`);

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check for nested <a> tags or Link inside Link / Link inside a
  const linkMatches = content.match(/<(Link|a)\b[^>]*>[\s\S]*?<\/(Link|a)>/g);
  if (linkMatches) {
    linkMatches.forEach(m => {
      // check if inner has another <Link or <a
      const inner = m.substring(m.indexOf('>') + 1, m.lastIndexOf('<'));
      if (/<(Link|a)\b/.test(inner)) {
        console.log(`[Nested Link/A Warning] in ${file}:\n  ${m.substring(0, 100)}...`);
      }
    });
  }

  // Check for <p> containing <div> or <p> or <h3> etc.
  const pMatches = content.match(/<p\b[^>]*>[\s\S]*?<\/p>/g);
  if (pMatches) {
    pMatches.forEach(m => {
      const inner = m.substring(m.indexOf('>') + 1, m.lastIndexOf('<'));
      if (/<(div|h1|h2|h3|h4|h5|h6|p|ul|ol|table|section|article|header|footer)\b/.test(inner)) {
        console.log(`[Invalid P Nesting] in ${file}:\n  ${m.substring(0, 120)}...`);
      }
    });
  }
});
