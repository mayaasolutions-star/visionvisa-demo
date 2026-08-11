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
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const rootDir = 'D:/PROFESSIONAL/Mayaa Industries/Clients/Vision Visa/VisionVisa/visionvisa.in';
const files = [...getAllFiles(rootDir + '/app'), ...getAllFiles(rootDir + '/components')];

console.log(`Checking ${files.length} files...`);

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('typeof window')) {
      console.log(`[Window Check] ${file}:${idx + 1}: ${line.trim()}`);
    }
    if (line.includes('Math.random()')) {
      console.log(`[Math.random Check] ${file}:${idx + 1}: ${line.trim()}`);
    }
    if (line.includes('Date.now()') || line.includes('new Date()')) {
      console.log(`[Date Check] ${file}:${idx + 1}: ${line.trim()}`);
    }
  });
});
