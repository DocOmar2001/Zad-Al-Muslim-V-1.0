
import React, { useState, useEffect } from 'react';

interface DhikrCounterProps {
  totalCount: number;
}

const DhikrCounter: React.FC<DhikrCounterProps> = ({ totalCount }) => {
  const [count, setCount] = useState(totalCount);
  const [isCompleted, setIsCompleted] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setCount(totalCount);
    setIsCompleted(false);
    setAnimationKey(prev => prev + 1);
  }, [totalCount]);

  const handleClick = () => {
    if (isCompleted) {
        setCount(totalCount);
        setIsCompleted(false);
        setAnimationKey(prev => prev + 1);
        return;
    };

    if (count > 1) {
      setCount(prev => prev - 1);
    } else {
      setCount(0);
      setIsCompleted(true);
    }
    setAnimationKey(prev => prev + 1);
  };

  const buttonText = isCompleted ? '✓' : count;
  const progress = isCompleted ? 100 : (totalCount - count) / totalCount * 100;
  
  const buttonTitle = isCompleted ? "إعادة" : "اضغط للعد";


  return (
    <div className="relative">
       <style>{`
        @keyframes pulse-once {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .animate-pulse-once {
          animation: pulse-once 0.2s ease-in-out;
        }
      `}</style>
      <button
        onClick={handleClick}
        title={buttonTitle}
        className={`animate-pulse-once relative w-24 h-24 rounded-full flex items-center justify-center font-bold text-3xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500 overflow-hidden ${isCompleted ? 'bg-emerald-600 text-white' : 'bg-white/80 dark:bg-gray-700/80 text-emerald-700 dark:text-emerald-300'}`}
        aria-label={`Counter, current value ${count}`}
        key={animationKey}
      >
        <div 
          className="absolute bottom-0 left-0 w-full h-full bg-emerald-500/30 transition-transform duration-200 ease-out"
          style={{ transform: `translateY(${100 - progress}%)` }}
        ></div>
        <span className="relative z-10 font-mono">{buttonText}</span>
      </button>
    </div>
  );
};

export default DhikrCounter;
