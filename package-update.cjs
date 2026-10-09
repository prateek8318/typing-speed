const fs = require('fs');

const pkgPath = './package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkg.scripts = {
  "dev": "vite",
  "build": "vite-react-ssg build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview"
};

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('package.json updated.');
