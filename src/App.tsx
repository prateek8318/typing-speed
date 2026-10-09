import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import HindiTypingTest from './pages/HindiTypingTest'
import OneMinuteTypingTest from './pages/OneMinuteTypingTest'
import TwoMinuteTypingTest from './pages/TwoMinuteTypingTest'
import FiveMinuteTypingTest from './pages/FiveMinuteTypingTest'
import SSCTypingTest from './pages/SSCTypingTest'
import CPCTTypingTest from './pages/CPCTTypingTest'
import TypingTestForKids from './pages/TypingTestForKids'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import Game from './pages/Game'

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
          <Route path="/game" element={<Game />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App