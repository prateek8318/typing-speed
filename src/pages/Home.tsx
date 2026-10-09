import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import TypingBox from '../components/TypingBox'
import { paragraphsData } from '../data/paragraphs'
import { Layers, Timer, Hash, Quote } from 'lucide-react'

export type Difficulty = 'easy' | 'medium' | 'hard';

export default function Home() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [timeLimit, setTimeLimit] = useState<number>(60);
  const [text, setText] = useState('');
  
  useEffect(() => {
    const paras = paragraphsData[difficulty];
    const randomPara = paras[Math.floor(Math.random() * paras.length)];
    setText(randomPara.toLowerCase());
  }, [difficulty]);
  
  return (
    <div className="flex flex-col items-center w-full fade-in">
      <Helmet>
        <title>Typing Speed Test Pro - Improve Your WPM Today</title>
        <meta name="description" content="Take a free typing speed test to check your WPM and accuracy. Improve your typing skills with our clean, distraction-free environment." />
        <meta name="keywords" content="typing test, speed test, WPM, improve typing speed, keyboard practice, words per minute" />
        <meta property="og:title" content="Typing Speed Test Pro" />
        <meta property="og:description" content="Check and improve your typing speed (WPM) with our free minimalist typing test." />
        <meta property="og:url" content="https://typing-speed-two-gamma.vercel.app/" />
      </Helmet>
      
      <div className="flex justify-center mb-8 bg-slate-800/50 rounded-xl p-2 gap-4 text-sm font-semibold text-slate-500 flex-wrap">
        <div className="flex space-x-1">
          <button className="flex items-center space-x-2 px-4 py-2 text-primary-500 transition-colors">
            <Timer size={16} />
            <span className="hidden sm:inline">time</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 hover:text-white transition-colors opacity-50 cursor-not-allowed" title="Words mode coming soon">
            <Hash size={16} />
            <span className="hidden sm:inline">words</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 hover:text-white transition-colors opacity-50 cursor-not-allowed" title="Quote mode coming soon">
            <Quote size={16} />
            <span className="hidden sm:inline">quote</span>
          </button>
        </div>
        
        <div className="w-px h-6 bg-slate-700 self-center mx-1"></div>
        
        <div className="flex space-x-1">
          <button 
            onClick={() => setDifficulty('easy')}
            className={`px-4 py-2 transition-colors flex items-center space-x-1 ${difficulty === 'easy' ? 'text-primary-500' : 'hover:text-white'}`}
          >
            <Layers size={14} />
            <span>easy</span>
          </button>
          <button 
            onClick={() => setDifficulty('medium')}
            className={`px-4 py-2 transition-colors flex items-center space-x-1 ${difficulty === 'medium' ? 'text-primary-500' : 'hover:text-white'}`}
          >
            <Layers size={14} />
            <span>medium</span>
          </button>
          <button 
            onClick={() => setDifficulty('hard')}
            className={`px-4 py-2 transition-colors flex items-center space-x-1 ${difficulty === 'hard' ? 'text-primary-500' : 'hover:text-white'}`}
          >
            <Layers size={14} />
            <span>hard</span>
          </button>
        </div>
        
        <div className="w-px h-6 bg-slate-700 self-center mx-1"></div>
        
        <div className="flex space-x-1">
          {[15, 30, 60, 120].map((t) => (
            <button 
              key={t}
              onClick={() => setTimeLimit(t)}
              className={`px-3 py-2 transition-colors ${timeLimit === t ? 'text-primary-500' : 'hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {text && <TypingBox text={text} initialTime={timeLimit} key={`${difficulty}-${timeLimit}-${text.substring(0, 10)}`} />}
      
    </div>
  )
}