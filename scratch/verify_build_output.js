const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = walk('out');
console.log('Total HTML files checked:', htmlFiles.length);

let totalImgTags = 0;
let publicImagesCount = 0;
let dupBaseCount = 0;
let correctBaseCount = 0;

htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('/public/images/')) {
    publicImagesCount++;
    console.error('ERROR: Found /public/images/ in', f);
  }
  if (content.includes('/visionvisa-demo/visionvisa-demo/')) {
    dupBaseCount++;
    console.error('ERROR: Found duplicated basePath in', f);
  }
  if (content.includes('/visionvisa-demo/images/')) {
    correctBaseCount++;
  }

  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    totalImgTags++;
    const src = match[1];
    if (!src.startsWith('https://flagcdn.com') && !src.startsWith('/visionvisa-demo/')) {
      console.warn('WARN: img src not starting with /visionvisa-demo/ in', f, 'src=', src);
    }
  }
});

console.log('\n--- Build Audit Verification Results ---');
console.log('Total HTML files:', htmlFiles.length);
console.log('Total <img> tags evaluated:', totalImgTags);
console.log('Files with /public/images/ (must be 0):', publicImagesCount);
console.log('Files with duplicated /visionvisa-demo/visionvisa-demo/ (must be 0):', dupBaseCount);
console.log('Files with correct /visionvisa-demo/images/:', correctBaseCount);

const outImagesDir = path.join('out', 'images');
const imagesInOut = fs.existsSync(outImagesDir) ? fs.readdirSync(outImagesDir).length : 0;
console.log('Images present in generated output folder (out/images):', imagesInOut, 'files');

// Check nested page sample out/country/argentina/index.html
const sampleNested = path.join('out', 'country', 'argentina', 'index.html');
if (fs.existsSync(sampleNested)) {
  const sampleContent = fs.readFileSync(sampleNested, 'utf8');
  console.log('\n--- Sample Nested Page (out/country/argentina/index.html) ---');
  const heroMatch = sampleContent.match(/<img[^>]+id="heroBgImg"[^>]+src="([^"]+)"/);
  if (heroMatch) {
    console.log('Argentina Hero Image Src:', heroMatch[1]);
  }
}
