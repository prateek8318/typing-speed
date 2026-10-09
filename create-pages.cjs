const fs = require('fs');
const path = require('path');

const pages = [
  'HindiTypingTest',
  'OneMinuteTypingTest',
  'TwoMinuteTypingTest',
  'FiveMinuteTypingTest',
  'SSCTypingTest',
  'CPCTTypingTest',
  'TypingTestForKids',
  'About',
  'Contact',
  'PrivacyPolicy',
  'Terms',
  'NotFound'
];

pages.forEach(page => {
  const content = `
import { Helmet } from 'react-helmet-async'

export default function ${page}() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <Helmet>
        <title>${page.replace(/([A-Z])/g, ' $1').trim()} - TypingSpeedPro</title>
        <meta name="description" content="Take our ${page.replace(/([A-Z])/g, ' $1').trim()} for free online." />
      </Helmet>
      <h1>${page.replace(/([A-Z])/g, ' $1').trim()}</h1>
      <p>This page provides tools and information for the ${page.replace(/([A-Z])/g, ' $1').trim()}. Keep practicing your typing speed to improve your results. Accuracy is key, focus on not making mistakes before you increase your speed.</p>
    </div>
  )
}
`;
  fs.writeFileSync(`src/pages/${page}.tsx`, content.trim());
});

const appContent = `
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
${pages.map(page => `import ${page} from './pages/${page}'`).join('\\n')}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hindi-typing-test" element={<HindiTypingTest />} />
          <Route path="/1-minute-typing-test" element={<OneMinuteTypingTest />} />
          <Route path="/2-minute-typing-test" element={<TwoMinuteTypingTest />} />
          <Route path="/5-minute-typing-test" element={<FiveMinuteTypingTest />} />
          <Route path="/ssc-typing-test" element={<SSCTypingTest />} />
          <Route path="/cpct-typing-test" element={<CPCTTypingTest />} />
          <Route path="/typing-test-for-kids" element={<TypingTestForKids />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
`;

fs.writeFileSync('src/App.tsx', appContent.trim());
console.log('Pages created');
