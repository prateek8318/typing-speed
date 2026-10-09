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
    if (isActive && timeLeft > 0) {
      const timeElapsed = initialTime - timeLeft;
      if (timeElapsed > 0) {
        const correctChars = typed.split('').filter((c, i) => c === text[i]).length;
        const wpm = Math.round((correctChars / 5) / (timeElapsed / 60));
        const accuracy = typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;
        
        // Prevent duplicate entries for the same second
        setWpmData(prev => {
          if (prev.length > 0 && prev[prev.length - 1].time === timeElapsed) {
            return prev;
          }
          return [...prev, { time: timeElapsed, wpm, accuracy }];
        });
      }
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