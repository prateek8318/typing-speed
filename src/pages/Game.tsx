import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { wordsData } from '../data/paragraphs';
import { RotateCcw, Play, Activity } from 'lucide-react';

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
}

export default function Game() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [typed, setTyped] = useState('');
  
  const [activeWords, setActiveWords] = useState<FallingWord[]>([]);
  const activeWordsRef = useRef(activeWords);
  activeWordsRef.current = activeWords;

  const requestRef = useRef<number>();
  const lastSpawnTime = useRef<number>(0);
  const wordIdCounter = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const getWordList = () => wordsData[difficulty];

  const spawnWord = useCallback((timestamp: number) => {
    const spawnRate = difficulty === 'easy' ? 2000 : difficulty === 'medium' ? 1500 : 1000;
    
    if (timestamp - lastSpawnTime.current > spawnRate) {
      const wordList = getWordList();
      const text = wordList[Math.floor(Math.random() * wordList.length)];
      
      const x = 10 + Math.random() * 70; 
      const speed = difficulty === 'easy' ? 0.05 : difficulty === 'medium' ? 0.08 : 0.12;

      const newWord: FallingWord = {
        id: wordIdCounter.current++,
        text: text.toLowerCase(),
        x,
        y: -5,
        speed: speed + (Math.random() * 0.04)
      };

      setActiveWords(prev => [...prev, newWord]);
      lastSpawnTime.current = timestamp;
    }
  }, [difficulty]);

  const updatePositions = useCallback(() => {
    setActiveWords(prevWords => {
      let lostLife = false;
      const nextWords = prevWords.map(w => ({ ...w, y: w.y + w.speed })).filter(w => {
        if (w.y > 95) { 
          lostLife = true;
          return false;
        }
        return true;
      });

      if (lostLife) {
        setLives(l => {
          const newLives = l - 1;
          if (newLives <= 0) {
            setGameState('gameover');
          }
          return newLives;
        });
      }
      return nextWords;
    });
  }, []);

  const gameLoop = useCallback((timestamp: number) => {
    if (gameState !== 'playing') return;
    spawnWord(timestamp);
    updatePositions();
    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, spawnWord, updatePositions]);

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop);
      if (inputRef.current) inputRef.current.focus();
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, gameLoop]);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    
    // If empty (backspace to zero), allow it
    if (value === '') {
      setTyped('');
      return;
    }

    // Check if the typed value is a prefix of ANY active word
    const isPrefix = activeWordsRef.current.some(w => w.text.startsWith(value));
    
    if (isPrefix) {
      setTyped(value);
      
      // Check if it's a FULL match for any word
      const matchedWordIndex = activeWordsRef.current.findIndex(w => w.text === value);
      if (matchedWordIndex !== -1) {
        const word = activeWordsRef.current[matchedWordIndex];
        setScore(s => s + word.text.length * 10);
        setActiveWords(prev => prev.filter((_, i) => i !== matchedWordIndex));
        setTyped(''); // reset input after destroying word
      }
    }
  };

  const startGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff);
    setScore(0);
    setLives(3);
    setActiveWords([]);
    setTyped('');
    setGameState('playing');
    lastSpawnTime.current = performance.now();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto fade-in h-[75vh] relative overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
      <Helmet>
        <title>Game - typingspeedpro</title>
      </Helmet>

      {/* Header / HUD */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20 border-b border-slate-800 bg-slate-900/90">
        <div className="flex items-center space-x-2 text-slate-300 font-mono text-xl">
          <Activity size={20} className="text-primary-500" />
          <span>SCORE: {score.toString().padStart(5, '0')}</span>
        </div>
        <div className="flex items-center space-x-2 text-red-500">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full ${i < lives ? "bg-primary-500" : "bg-slate-800"}`}></div>
          ))}
        </div>
      </div>

      {/* Game Area */}
      {gameState === 'playing' && (
        <div 
          className="absolute inset-0 z-10 cursor-text mt-14"
          onClick={() => inputRef.current?.focus()}
        >
          {activeWords.map(word => {
            const isMatch = word.text.startsWith(typed) && typed.length > 0;
            return (
              <div 
                key={word.id} 
                className={`absolute font-mono text-xl transition-colors ${isMatch ? 'text-primary-500 scale-110' : 'text-slate-500'}`}
                style={{ left: `${word.x}%`, top: `${word.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                {isMatch ? (
                  <>
                    <span className="text-slate-900 bg-primary-500 px-0.5 rounded-sm">{word.text.substring(0, typed.length)}</span>
                    <span>{word.text.substring(typed.length)}</span>
                  </>
                ) : (
                  word.text
                )}
              </div>
            );
          })}
          
          <input 
            ref={inputRef}
            type="text" 
            value={typed}
            onChange={handleTyping}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-200 font-mono text-xl text-center px-4 py-2 border-b-2 border-primary-500 focus:outline-none w-64 shadow-md rounded-t-md"
            placeholder="type here..."
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      )}

      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-slate-900/90 backdrop-blur-sm">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-slate-200 mb-2 font-mono tracking-tight">typingspeed<span className="text-primary-500">pro</span></h2>
            <p className="text-slate-500 text-sm font-mono max-w-sm mx-auto">Type the falling words before they hit the bottom.</p>
          </div>
          
          <div className="flex flex-col space-y-4 w-64 font-mono text-lg">
            <button onClick={() => startGame('easy')} className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700">
              <Play size={16} /> <span>EASY</span>
            </button>
            <button onClick={() => startGame('medium')} className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700">
              <Play size={16} /> <span>MEDIUM</span>
            </button>
            <button onClick={() => startGame('hard')} className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700">
              <Play size={16} /> <span>HARD</span>
            </button>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-slate-900/95">
          <div className="text-center mb-8 font-mono">
            <h2 className="text-4xl font-black text-red-500 mb-6">GAME OVER</h2>
            <p className="text-slate-500 text-lg mb-1">SCORE</p>
            <p className="text-6xl font-black text-primary-500">{score}</p>
          </div>
          
          <div className="flex space-x-4 font-mono text-sm">
            <button onClick={() => startGame(difficulty)} className="flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-slate-900 font-bold rounded-lg transition-colors">
              <RotateCcw size={16} /> <span>RETRY</span>
            </button>
            <button onClick={() => setGameState('start')} className="flex items-center space-x-2 px-6 py-3 bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors border border-slate-700">
              <span>MENU</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Danger Zone Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500/20 z-0"></div>
    </div>
  );
}
