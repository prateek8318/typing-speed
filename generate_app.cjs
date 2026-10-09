const fs = require('fs');
const path = require('path');

const files = {
  'src/hooks/useTypingTest.ts': `
import { useState, useEffect, useCallback, useRef } from 'react';

export type TestMode = 'time' | 'words';

export function useTypingTest(initialTime: number, text: string) {
  const [typed, setTyped] = useState('');
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [errors, setErrors] = useState(0);
  const [wpmData, setWpmData] = useState<{ time: number; wpm: number }[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setIsActive(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setIsFinished(true);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0 && timeLeft % 5 === 0) {
      const timeElapsed = initialTime - timeLeft;
      const correctChars = typed.split('').filter((c, i) => c === text[i]).length;
      const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / (timeElapsed / 60)) : 0;
      setWpmData(prev => [...prev, { time: timeElapsed, wpm }]);
    }
  }, [timeLeft, isActive, initialTime, typed, text]);

  const handleTyping = useCallback((value: string) => {
    if (!isActive && !isFinished && value.length === 1) {
      startTimer();
    }
    
    if (isFinished) return;
    
    setTyped(value);
    
    // Count errors simple approach: length difference of wrong chars
    const currentErrors = value.split('').filter((char, i) => char !== text[i]).length;
    setErrors(currentErrors);
    
    if (value.length >= text.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsFinished(true);
    }
  }, [isActive, isFinished, startTimer, text]);

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTyped('');
    setTimeLeft(initialTime);
    setIsActive(false);
    setIsFinished(false);
    setErrors(0);
    setWpmData([]);
  }, [initialTime]);

  const timeElapsed = initialTime - timeLeft;
  const correctChars = typed.split('').filter((char, i) => char === text[i]).length;
  const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / (timeElapsed / 60)) : 0;
  const accuracy = typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;

  return {
    typed,
    timeLeft,
    isActive,
    isFinished,
    errors,
    wpm,
    accuracy,
    wpmData,
    handleTyping,
    reset
  };
}
`,
  'src/components/TypingBox.tsx': `
import React, { useRef, useEffect } from 'react';
import { useTypingTest } from '../hooks/useTypingTest';

interface TypingBoxProps {
  text: string;
  initialTime: number;
}

export default function TypingBox({ text, initialTime }: TypingBoxProps) {
  const { typed, timeLeft, isFinished, errors, wpm, accuracy, handleTyping, reset } = useTypingTest(initialTime, text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = () => {
      if (inputRef.current) inputRef.current.focus();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-center mb-6 text-slate-500 font-mono text-lg">
        <div>{timeLeft}s</div>
        {isFinished && <div>WPM: {wpm} | Acc: {accuracy}%</div>}
      </div>
      
      <div className="relative text-2xl font-mono leading-relaxed h-48 overflow-hidden text-slate-400 select-none" onClick={() => inputRef.current?.focus()}>
        {text.split('').map((char, index) => {
          let color = '';
          if (index < typed.length) {
            color = typed[index] === char ? 'text-green-500' : 'text-red-500 bg-red-100 dark:bg-red-900/30';
          }
          const isCaret = index === typed.length && !isFinished;
          
          return (
            <span key={index} className={\`\${color} \${isCaret ? 'border-l-2 border-primary-500 caret-blink -ml-[2px]' : ''}\`}>
              {char}
            </span>
          );
        })}
      </div>
      
      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute -z-10"
        value={typed}
        onChange={(e) => handleTyping(e.target.value)}
        disabled={isFinished}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        spellCheck="false"
      />
      
      {isFinished && (
        <div className="mt-8 text-center">
          <button onClick={reset} className="px-6 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
`,
  'src/data/paragraphs.ts': `
export const englishParagraphs = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet, which is why it is used to test typewriters and computer keyboards. Typing fast requires practice and muscle memory.",
  "Learning to type fast can significantly improve your productivity. When you don't have to look at the keyboard, you can focus entirely on the ideas you are trying to express. Practice every day to see improvement.",
];
`,
  'src/pages/Home.tsx': `
import { Helmet } from 'react-helmet-async'
import TypingBox from '../components/TypingBox'
import { englishParagraphs } from '../data/paragraphs'

export default function Home() {
  const text = englishParagraphs[0];
  
  return (
    <div>
      <Helmet>
        <title>Free Online Typing Test - Check your WPM speed</title>
        <meta name="description" content="Test your typing speed in WPM for free. Improve your typing accuracy and speed with our beautiful and fast typing test." />
      </Helmet>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Check Your Typing Speed</h1>
        <p className="text-slate-500 dark:text-slate-400">Start typing to begin the test.</p>
      </div>

      <TypingBox text={text} initialTime={60} />
      
      <article className="mt-16 prose dark:prose-invert max-w-none">
        <h2>How to improve your typing speed?</h2>
        <p>Typing is a skill that takes time to develop. The most important thing is to focus on accuracy before speed. When you type accurately, speed will naturally follow. Make sure you use all your fingers and maintain good posture while typing.</p>
        
        <h2>What is a good typing speed?</h2>
        <p>An average professional typist types around 43 to 80 WPM. However, many people who type daily can easily reach speeds of over 100 WPM with practice. Our typing test helps you track your progress over time.</p>
      </article>
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
console.log('App components generated.');
