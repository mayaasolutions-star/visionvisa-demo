const fs = require('fs');

['js/countries-data.js', 'public/js/countries-data.js'].forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}');

    if (jsonStart !== -1 && jsonEnd !== -1) {
      const prefix = content.substring(0, jsonStart);
      const suffix = content.substring(jsonEnd + 1);
      const data = JSON.parse(content.substring(jsonStart, jsonEnd + 1));

      // Add united-states if usa exists
      if (data['usa'] && !data['united-states']) {
        data['united-states'] = { ...data['usa'], slug: 'united-states', name: 'USA' };
      }

      // Add united-arab-emirates if uae exists
      if (data['uae'] && !data['united-arab-emirates']) {
        data['united-arab-emirates'] = { ...data['uae'], slug: 'united-arab-emirates', name: 'UAE' };
      }

      // Add indonesia if indonesia-bali exists
      if (data['indonesia-bali'] && !data['indonesia']) {
        data['indonesia'] = { ...data['indonesia-bali'], slug: 'indonesia', name: 'Indonesia' };
      }

      const newContent = prefix + JSON.stringify(data, null, 2) + suffix;
      fs.writeFileSync(filePath, newContent);
      console.log('Updated aliased keys in', filePath);
    }
  }
});

// Update lib/countries-list.json as well
if (fs.existsSync('lib/countries-list.json')) {
  const list = JSON.parse(fs.readFileSync('lib/countries-list.json', 'utf8'));
  const hasUS = list.some(c => c.slug === 'united-states');
  if (!hasUS) {
    list.push({ name: 'USA', slug: 'united-states', visaType: 'B1/B2 Visitor Visa', flagImage: 'https://flagcdn.com/w40/us.png' });
  }
  const hasUAE = list.some(c => c.slug === 'united-arab-emirates');
  if (!hasUAE) {
    list.push({ name: 'UAE', slug: 'united-arab-emirates', visaType: 'Tourist / Business Visa', flagImage: 'https://flagcdn.com/w40/ae.png' });
  }
  const hasIndo = list.some(c => c.slug === 'indonesia');
  if (!hasIndo) {
    list.push({ name: 'Indonesia', slug: 'indonesia', visaType: 'e-VOA / Tourist Visa', flagImage: 'https://flagcdn.com/w40/id.png' });
  }
  fs.writeFileSync('lib/countries-list.json', JSON.stringify(list, null, 2));
  console.log('Updated lib/countries-list.json');
}
