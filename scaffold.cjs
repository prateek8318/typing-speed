const fs = require('fs');
const path = require('path');

const files = {
  'vite.config.ts': `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
`,
  'src/main.tsx': `
import { StrictMode } from 'react'
import { ViteReactSSG } from 'vite-react-ssg/single-page'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

export const createRoot = ViteReactSSG(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
`,
  'src/App.tsx': `
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
`,
  'src/components/Layout.tsx': `
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">
      <header className="p-4 shadow-sm">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">TypingSpeedPro</h1>
        </nav>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full p-4">
        {children}
      </main>
      <footer className="p-4 text-center border-t border-slate-200 dark:border-slate-800">
        <p>&copy; 2026 TypingSpeedPro. All rights reserved.</p>
      </footer>
    </div>
  )
}
`,
  'src/pages/Home.tsx': `
import { Helmet } from 'react-helmet-async'

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Typing Test - Check your WPM speed</title>
        <meta name="description" content="Test your typing speed in WPM for free." />
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Typing Test</h1>
      <p>Content goes here.</p>
    </div>
  )
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const dir = path.dirname(filepath);
  if (dir !== '.') {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, content.trim() + '\\n');
}
console.log('Scaffold complete.');
