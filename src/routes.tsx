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
import { Outlet } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <Layout><Outlet /></Layout>,
    children: [
      { index: true, element: <Home /> },
      { path: 'hindi-typing-test', element: <HindiTypingTest /> },
      { path: '1-minute-typing-test', element: <OneMinuteTypingTest /> },
      { path: '2-minute-typing-test', element: <TwoMinuteTypingTest /> },
      { path: '5-minute-typing-test', element: <FiveMinuteTypingTest /> },
      { path: 'ssc-typing-test', element: <SSCTypingTest /> },
      { path: 'cpct-typing-test', element: <CPCTTypingTest /> },
      { path: 'typing-test-for-kids', element: <TypingTestForKids /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'game', element: <Game /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms', element: <Terms /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]

export default routes
