
import React from 'react';
import type { Quote } from '../types';
import { QuranIcon, HadithIcon, AdhkarIcon, CalendarIcon } from './Icons';

interface HeroProps {
  quote: Quote;
  onQuranClick: () => void;
  onAdhkarClick: () => void;
  onCalendarClick: () => void;
  onHadithClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ quote, onQuranClick, onAdhkarClick, onCalendarClick, onHadithClick }) => {
  const buttons = [
    { id: 'quran', label: 'القرآن الكريم', icon: <QuranIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />, action: onQuranClick },
    { id: 'hadith', label: 'الحديث الشريف', icon: <HadithIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />, action: onHadithClick },
    { id: 'adhkar', label: 'الأذكار', icon: <AdhkarIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />, action: onAdhkarClick },
    { id: 'calendar', label: 'التقويم', icon: <CalendarIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />, action: onCalendarClick },
  ];

  return (
    <div className="text-center w-full max-w-4xl py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={button.action}
            className="group flex flex-col items-center justify-center p-4 md:p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-emerald-900/50 transform hover:-translate-y-2 transition-all duration-300 ease-in-out border-2 border-white/50 hover:border-emerald-500"
          >
            <div className="text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                {button.icon}
            </div>
            <span className="text-sm md:text-lg font-bold text-gray-900 dark:text-gray-50">{button.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 px-4 py-6 bg-emerald-50/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-inner border border-emerald-700/20 dark:border-emerald-400/20">
        <blockquote className="max-w-2xl mx-auto">
          <p className="text-lg md:text-xl font-amiri italic text-gray-900 dark:text-gray-100">
            "{quote.quote}"
          </p>
          <footer className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            - {quote.source}
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default Hero;
