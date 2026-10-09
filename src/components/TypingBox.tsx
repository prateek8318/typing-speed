import React, { useRef, useEffect, useState } from 'react';
import { useTypingTest } from '../hooks/useTypingTest';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw } from 'lucide-react';

interface TypingBoxProps {
  text: string;
  initialTime: number;
}

export default function TypingBox({ text, initialTime }: TypingBoxProps) {
  const { typed, timeLeft, isActive, isFinished, wpm, accuracy, wpmData, handleTyping, reset } = useTypingTest(initialTime, text);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        reset();
      } else {
        if (inputRef.current) inputRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reset]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 rounded-lg shadow-xl text-slate-300 font-mono text-sm border border-slate-700">
          <p className="mb-1">{label}s</p>
          <p className="text-primary-500 font-bold">WPM: {payload[0].value}</p>
          {payload[1] && <p className="text-slate-300">Accuracy: {payload[1].value}%</p>}
        </div>
      );
    }
    return null;
  };

  if (isFinished) {
    return (
      <div className="w-full max-w-5xl mx-auto p-8 fade-in">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex flex-col space-y-6 w-full md:w-1/4">
            <div>
              <h2 className="text-6xl font-black text-primary-500">{wpm}</h2>
              <p className="text-slate-500 text-xl mt-2">wpm</p>
            </div>
            <div>
              <h2 className="text-6xl font-black text-slate-300">{accuracy}%</h2>
              <p className="text-slate-500 text-xl mt-2">acc</p>
            </div>
          </div>
          
          <div className="h-64 md:h-80 w-full md:w-3/4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wpmData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a4d51" vertical={false} />
                <XAxis dataKey="time" stroke="#646669" tick={{ fill: '#646669' }} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#646669" tick={{ fill: '#646669' }} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#646669" tick={{ fill: '#646669' }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4a4d51' }} />
                <Line yAxisId="left" type="monotone" dataKey="wpm" stroke="#e2b714" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#e2b714', strokeWidth: 0 }} />
                <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#646669" strokeWidth={2} dot={false} activeDot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={reset} 
            className="flex items-center space-x-2 px-6 py-3 text-slate-400 hover:text-white transition-colors"
            title="Restart Test (Tab)"
          >
            <RefreshCw size={24} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mt-12 mb-20 relative">
      <div className="flex justify-between items-center mb-8 h-10">
        <div className={`text-2xl font-black text-primary-500 transition-opacity duration-300 ${!isActive && timeLeft === initialTime ? 'opacity-0' : 'opacity-100'}`}>
          {timeLeft}
        </div>
        
        {!isFocused && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-400 flex flex-col items-center z-10 cursor-pointer" onClick={() => inputRef.current?.focus()}>
            <span className="text-xl font-medium mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              <span>Click here to focus</span>
            </span>
          </div>
        )}
      </div>
      
      <div 
        className={`relative text-2xl md:text-3xl font-mono leading-relaxed max-h-[300px] overflow-hidden select-none transition-all duration-300 ${isFocused ? 'opacity-100 filter-none' : 'opacity-40 blur-[4px]'}`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-wrap gap-x-[0.5em] gap-y-2">
          {text.split(' ').map((word, wordIdx) => {
            const startIdx = text.split(' ').slice(0, wordIdx).join(' ').length + (wordIdx > 0 ? 1 : 0);
            
            return (
              <div key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split('').map((char, charOffset) => {
                  const index = startIdx + charOffset;
                  let color = 'text-[#646669]';
                  
                  if (index < typed.length) {
                    if (typed[index] === char) {
                      color = 'text-slate-300';
                    } else {
                      color = 'text-red-500 bg-red-500/20 rounded-sm border-b-2 border-red-500';
                    }
                  }
                  const isCaret = index === typed.length && isFocused;
                  
                  return (
                    <span key={index} className="relative">
                      {isCaret && (
                        <span className="absolute -left-[1px] top-[10%] w-[2px] h-[80%] bg-primary-500 caret-blink z-10" />
                      )}
                      <span className={`${color}`}>
                        {char}
                      </span>
                    </span>
                  );
                })}
                {wordIdx < text.split(' ').length - 1 && (
                  <span className="relative inline-block w-[0.5em]">
                    {(() => {
                      const spaceIdx = startIdx + word.length;
                      let spaceColor = '';
                      if (spaceIdx < typed.length) {
                        if (typed[spaceIdx] === ' ') {
                          spaceColor = '';
                        } else {
                          spaceColor = 'bg-red-500/20 border-b-2 border-red-500';
                        }
                      }
                      const isSpaceCaret = spaceIdx === typed.length && isFocused;
                      
                      return (
                        <>
                          {isSpaceCaret && (
                            <span className="absolute -left-[1px] top-[10%] w-[2px] h-[80%] bg-primary-500 caret-blink z-10" />
                          )}
                          <span className={`inline-block w-full h-full ${spaceColor}`}>&nbsp;</span>
                        </>
                      );
                    })()}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute -z-10"
        value={typed}
        onChange={(e) => handleTyping(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isFinished}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        spellCheck="false"
      />

      <div className="mt-16 flex justify-center opacity-0 focus-within:opacity-100 hover:opacity-100 transition-opacity">
        <button 
          onClick={reset} 
          className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors"
          title="Restart Test (Tab)"
        >
          <RefreshCw size={18} />
          <span className="text-sm"><kbd className="px-1.5 py-0.5 bg-slate-800 rounded">tab</kbd></span>
        </button>
      </div>
    </div>
  );
}