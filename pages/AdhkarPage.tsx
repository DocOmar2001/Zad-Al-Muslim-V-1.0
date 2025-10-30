import React from 'react';
import { ADHKAR_CATEGORIES } from '../data/adhkar';
import { AdhkarIcon, BedIcon, MoonIcon, SunIcon, WakingUpIcon, PrayIcon, WuduIcon, TravelIcon, MarketIcon } from '../components/Icons';

interface AdhkarPageProps {
  onNavigateToDetail: (categoryKey: string) => void;
  onBack: () => void;
}

const iconMap: { [key: string]: React.ReactNode } = {
  morning: <SunIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />,
  evening: <MoonIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />,
  after_prayer: <PrayIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />,
  sleep: <BedIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />,
  waking_up: <WakingUpIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />,
  wudu: <WuduIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />,
  travel: <TravelIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />,
  market: <MarketIcon className="w-8 h-8 md:w-10 md:h-10 mb-2" />,
};

const AdhkarPage: React.FC<AdhkarPageProps> = ({ onNavigateToDetail, onBack }) => {
  return (
    <div className="w-full max-w-4xl p-6 md:p-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg border-2 border-white/50 text-gray-900 dark:text-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-amiri font-bold text-emerald-700 dark:text-emerald-400">
          الأذكار
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors"
        >
          العودة للرئيسية
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {ADHKAR_CATEGORIES.map(category => (
          <button
            key={category.key}
            onClick={() => onNavigateToDetail(category.key)}
            className="group flex flex-col items-center justify-center p-4 md:p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-emerald-900/50 transform hover:-translate-y-2 transition-all duration-300 ease-in-out border-2 border-white/50 hover:border-emerald-500"
          >
            <div className="text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
              {iconMap[category.key] || <AdhkarIcon className="w-10 h-10 mb-2" />}
            </div>
            <span className="text-sm md:text-lg font-bold text-center text-gray-900 dark:text-gray-50">{category.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdhkarPage;
