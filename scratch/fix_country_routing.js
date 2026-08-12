const fs = require('fs');
const { execSync } = require('child_process');

try {
  execSync('git checkout app/page.jsx');
  console.log('Restored app/page.jsx to clean state');
} catch (e) {
  console.error('Git checkout error:', e);
}

let pageContent = fs.readFileSync('app/page.jsx', 'utf8');

// Replace opening <a href="/country/slug" ...> with <Link href="/country/slug" ...>
// Next.js Link automatically prepends basePath without double prefixing!
pageContent = pageContent.replace(/<a href="\/country\/([^"]+)"([^>]*)>/g, '<Link href="/country/$1"$2>');
pageContent = pageContent.replace(/<a href="country\/([^"]+)"([^>]*)>/g, '<Link href="/country/$1"$2>');

// Replace closing </a> for card links with </Link>
pageContent = pageContent.replace(/(<Link href="\/country\/[^"]+"[\s\S]*?)<\/a>/g, '$1</Link>');

fs.writeFileSync('app/page.jsx', pageContent);
console.log('Updated app/page.jsx country card links to use Next.js <Link href="/country/slug">');

// 2. Update components/HeroSearchForm.jsx
let searchFormContent = fs.readFileSync('components/HeroSearchForm.jsx', 'utf8');
searchFormContent = searchFormContent.replace(/window\.location\.href = `\/country\/\$\{([^}]+)\}`;/g, 'window.location.href = getAssetPath(`/country/${$1}`);');
searchFormContent = searchFormContent.replace(/href={`\/country\/\$\{([^}]+)\}`}/g, 'href={getAssetPath(`/country/${$1}`)}');
fs.writeFileSync('components/HeroSearchForm.jsx', searchFormContent);
console.log('Updated components/HeroSearchForm.jsx navigation logic');

// 3. Update js/search-engine.js and public/js/search-engine.js
['js/search-engine.js', 'public/js/search-engine.js'].forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<a href="\/country\/\$\{c\.slug\}"/g, '<a href="${(window.VISION_VISA_BASE_PATH || \'\')}/country/${c.slug}"');
    content = content.replace(/let targetUrl = `\/country\/\$\{targetSlug\}`;/g, 'let targetUrl = `${(window.VISION_VISA_BASE_PATH || \'\')}/country/${targetSlug}`;');
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  }
});
