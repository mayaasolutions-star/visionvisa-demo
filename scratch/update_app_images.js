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

files.forEach(filePath => {
  if (filePath.endsWith('lib\\asset-path.js') || filePath.endsWith('lib/asset-path.js')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Clean up any existing getAssetPath import
  if (content.includes("from '@/lib/asset-path'") || content.includes("from '../lib/asset-path'") || content.includes("from '../../../lib/asset-path'") || content.includes("from '../../lib/asset-path'")) {
    content = content.replace(/import \{ getAssetPath \} from ['"][^'"]+lib\/asset-path['"];?\n?/g, '');
    modified = true;
  }

  const hasImages = /src="images\/|src="\/images\/|src=\{data\.heroImage\}|src=\{data\.flagImage\}|src=\{image\}|assetPath\(/i.test(content);

  if (hasImages || filePath.includes('Navbar.jsx') || filePath.includes('Footer.jsx') || filePath.includes('layout.jsx')) {
    // Insert import at correct location (after 'use client' if present, else at top)
    if (!content.includes("import { getAssetPath }")) {
      if (/^['"]use client['"];?/m.test(content)) {
        content = content.replace(/^(['"]use client['"];?\s*)/m, "$1import { getAssetPath } from '@/lib/asset-path';\n");
      } else {
        content = "import { getAssetPath } from '@/lib/asset-path';\n" + content;
      }
      modified = true;
    }

    const newContent = content
      .replace(/src="images\/([^"]+)"/g, 'src={getAssetPath("/images/$1")}')
      .replace(/src="\/images\/([^"]+)"/g, 'src={getAssetPath("/images/$1")}')
      .replace(/src=\{data\.heroImage\}/g, 'src={getAssetPath(data.heroImage)}')
      .replace(/src=\{data\.flagImage\}/g, 'src={getAssetPath(data.flagImage)}')
      .replace(/src=\{image\}/g, 'src={getAssetPath(image)}')
      .replace(/assetPath\(/g, 'getAssetPath(');

    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log('Processed', filePath);
  }
});
