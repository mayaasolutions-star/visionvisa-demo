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
let totalReplaced = 0;

files.forEach(filePath => {
  if (filePath.endsWith('asset-path.js')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Ensure Link import exists in jsx files if we use <Link>
  const containsInternalA = /<a\s+[^>]*href=["']\/(contact|visas|travel-insurance|forex|air-tickets|about|apply-now|country|tourist-visa|business-visa|study-visa|work-visa|visitor-visa|family-visa)/i.test(content) || /<a\s+[^>]*href=\{`\/contact/i.test(content);

  if (containsInternalA && (filePath.endsWith('.jsx') || filePath.endsWith('.js'))) {
    if (!content.includes("import Link from 'next/link'") && !content.includes('import Link from "next/link"')) {
      if (/^['"]use client['"];?/m.test(content)) {
        content = content.replace(/^(['"]use client['"];?\s*)/m, "$1import Link from 'next/link';\n");
      } else {
        content = "import Link from 'next/link';\n" + content;
      }
      modified = true;
    }

    // Replace <a href="/route" ...> with <Link href="/route" ...>
    // And <a href={`/contact?country=${data.slug}`} ...> with <Link href={`/contact?country=${data.slug}`} ...>
    const routes = [
      'contact', 'visas', 'travel-insurance', 'forex', 'air-tickets', 'about', 'apply-now',
      'tourist-visa', 'business-visa', 'study-visa', 'work-visa', 'visitor-visa', 'family-visa'
    ];

    routes.forEach(route => {
      // Regex for literal href="/route" or href="/route?..."
      const literalRegex = new RegExp(`<a(\\s+[^>]*)href=["'](\/${route}(\\?[^"']*)?)["']([^>]*)>([\\s\\S]*?)<\\/a>`, 'gi');
      if (literalRegex.test(content)) {
        content = content.replace(literalRegex, '<Link$1href="$2"$4>$5</Link>');
        modified = true;
        totalReplaced++;
      }

      // Regex for template string href={`/route...`}
      const templateRegex = new RegExp(`<a(\\s+[^>]*)href=\\{(\`\\/${route}[^\`]*\`)}([\\s\\S]*?)>([\\s\\S]*?)<\\/a>`, 'gi');
      if (templateRegex.test(content)) {
        content = content.replace(templateRegex, '<Link$1href={$2}$3>$4</Link>');
        modified = true;
        totalReplaced++;
      }
    });
  }

  // 2. Fix HeroSection.jsx if it uses raw <a> tag for ctaLink / secondaryCtaLink
  if (filePath.includes('HeroSection.jsx')) {
    if (!content.includes("import Link from 'next/link'")) {
      content = "import Link from 'next/link';\n" + content;
      modified = true;
    }
    content = content.replace(/<a href=\{ctaLink\}([^>]*)>/g, '<Link href={ctaLink}$1>');
    content = content.replace(/<a href=\{secondaryCtaLink\}([^>]*)>/g, '<Link href={secondaryCtaLink}$1>');
    content = content.replace(/<\/a>/g, '</Link>');
    modified = true;
  }

  // 3. Fix client-side js files (country-render.js & search-engine.js)
  if (filePath.includes('country-render.js')) {
    content = content.replace(/heroApplyBtn\.href = `\/contact\?country=\${data\.slug}`;/g, 'heroApplyBtn.href = `${(window.VISION_VISA_BASE_PATH || \'\')}/contact?country=${data.slug}`;');
    content = content.replace(/ctaApplyBtn\.href = `\/contact\?country=\${data\.slug}`;/g, 'ctaApplyBtn.href = `${(window.VISION_VISA_BASE_PATH || \'\')}/contact?country=${data.slug}`;');
    modified = true;
  }

  if (filePath.includes('search-engine.js')) {
    content = content.replace(/window\.location\.href = `\/country\/\$\{targetSlug\}`;/g, 'window.location.href = `${(window.VISION_VISA_BASE_PATH || \'\')}/country/${targetSlug}`;');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log('Processed & updated internal routing in:', filePath);
  }
});

console.log(`\nCompleted audit & conversion of internal links. Total replaced: ${totalReplaced}`);
