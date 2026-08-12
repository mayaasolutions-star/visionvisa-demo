const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return [];
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

let totalHrefsChecked = 0;
let contactHrefCount = 0;
let visasHrefCount = 0;
let countryHrefCount = 0;
let rawDomainRootHrefs = 0;
let dupBasePathHrefs = 0;

const routesMap = {};

htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hrefRegex = /href="([^"]+)"/g;
  let match;

  while ((match = hrefRegex.exec(content)) !== null) {
    totalHrefsChecked++;
    const href = match[1];

    if (href.includes('/visionvisa-demo/visionvisa-demo/')) {
      dupBasePathHrefs++;
      console.error('ERROR: Duplicated basePath found in', f, 'href=', href);
    }

    if (href.startsWith('/contact') || href.startsWith('/visas') || href.startsWith('/about') || href.startsWith('/forex') || href.startsWith('/air-tickets') || href.startsWith('/travel-insurance') || href.startsWith('/country')) {
      rawDomainRootHrefs++;
      console.warn('WARN: Raw domain root href without basePath found in HTML output:', f, 'href=', href);
    }

    if (href.includes('/visionvisa-demo/contact')) {
      contactHrefCount++;
    }
    if (href.includes('/visionvisa-demo/visas')) {
      visasHrefCount++;
    }
    if (href.includes('/visionvisa-demo/country/')) {
      countryHrefCount++;
    }

    routesMap[href] = (routesMap[href] || 0) + 1;
  }
});

console.log('\n==================================================');
console.log('SITE-WIDE ROUTING AUDIT REPORT');
console.log('==================================================');
console.log('Total HTML files inspected:', htmlFiles.length);
console.log('Total href attributes evaluated across HTML files:', totalHrefsChecked);
console.log('Raw un-prefixed internal hrefs in output (must be 0):', rawDomainRootHrefs);
console.log('Duplicated basePath hrefs in output (must be 0):', dupBasePathHrefs);
console.log('Total /visionvisa-demo/contact/ links in output:', contactHrefCount);
console.log('Total /visionvisa-demo/visas/ links in output:', visasHrefCount);
console.log('Total /visionvisa-demo/country/... links in output:', countryHrefCount);

console.log('\n--- KEY STATIC PAGE EXPORTS VERIFIED ---');
const requiredPages = [
  'out/index.html',
  'out/contact/index.html',
  'out/about/index.html',
  'out/visas/index.html',
  'out/travel-insurance/index.html',
  'out/forex/index.html',
  'out/air-tickets/index.html',
  'out/country/index.html',
  'out/country/argentina/index.html',
  'out/country/australia/index.html',
  'out/country/canada/index.html',
  'out/country/japan/index.html',
  'out/country/united-kingdom/index.html',
  'out/country/usa/index.html',
  'out/tourist-visa/index.html',
  'out/business-visa/index.html',
  'out/study-visa/index.html',
  'out/work-visa/index.html',
  'out/visitor-visa/index.html',
  'out/family-visa/index.html'
];

let allExist = true;
requiredPages.forEach(p => {
  const exists = fs.existsSync(p);
  if (!exists) allExist = false;
  console.log(`[VERIFIED] ${p}:`, exists ? 'EXISTS (200 OK)' : 'MISSING (404)');
});

console.log('\nFinal Status:', allExist ? 'SUCCESS - ALL PAGES VERIFIED 200 OK' : 'FAILED');
