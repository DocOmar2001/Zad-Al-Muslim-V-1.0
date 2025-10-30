
import React from 'react';
import { SunIcon, MoonIcon } from './Icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="py-4 px-6 shadow-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl md:text-4xl font-amiri font-bold text-emerald-700 dark:text-emerald-400">
            زاد المسلم
          </h1>
          <span className="text-xs text-gray-500 dark:text-gray-400">V 1.0</span>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800 transition-all"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
