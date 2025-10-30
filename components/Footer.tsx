
import React from 'react';
import usePalestineCounter from '../hooks/usePalestineCounter';

const Footer: React.FC = () => {
  const duration = usePalestineCounter(new Date('1948-05-14T00:00:00Z'));

  return (
    <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-6 px-6 mt-8 shadow-inner">
      <div className="container mx-auto text-center text-gray-700 dark:text-gray-300">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <h3 className="font-bold text-md">مضى على احتلال فلسطين</h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg font-mono text-lg text-red-600 dark:text-red-400">
            <span>{duration.years} <span className="text-xs text-gray-500 dark:text-gray-400">سنوات</span></span>
            <span>{duration.months} <span className="text-xs text-gray-500 dark:text-gray-400">شهور</span></span>
            <span>{duration.days} <span className="text-xs text-gray-500 dark:text-gray-400">أيام</span></span>
          </div>
        </div>
        <a
          href="https://linktr.ee/Dr_Omar_Ayman_Rizk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-2 text-sm font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors"
        >
          تواصل معي
        </a>
      </div>
    </footer>
  );
};

export default Footer;
