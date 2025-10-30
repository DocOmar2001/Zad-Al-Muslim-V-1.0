
import React from 'react';
import { BookOpenIcon, SearchIcon } from '../components/Icons';

interface HadithPageProps {
  onBack: () => void;
  onNavigateToNawawi: () => void;
  onNavigateToSearch: () => void;
}

const HadithPage: React.FC<HadithPageProps> = ({ onBack, onNavigateToNawawi, onNavigateToSearch }) => {
  return (
    <div className="w-full max-w-2xl p-6 md:p-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg border-2 border-white/50 text-gray-900 dark:text-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-amiri font-bold text-emerald-700 dark:text-emerald-400">
          الحديث الشريف
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors"
        >
          العودة للرئيسية
        </button>
      </div>
      <div className="space-y-6">
        <button
          onClick={onNavigateToNawawi}
          className="w-full group flex items-center justify-start text-right p-6 bg-white/30 dark:bg-gray-700/50 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-emerald-900/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out border-2 border-white/50 hover:border-emerald-500"
        >
          <div className="text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300 ml-6">
            <BookOpenIcon className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">الأربعون النووية</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">تصفح مجموعة الأحاديث الصحيحة التي جمعها الإمام النووي.</p>
          </div>
        </button>

        <button
          onClick={onNavigateToSearch}
          className="w-full group flex items-center justify-start text-right p-6 bg-white/30 dark:bg-gray-700/50 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-emerald-900/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out border-2 border-white/50 hover:border-emerald-500"
        >
          <div className="text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300 ml-6">
            <SearchIcon className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">ابحث عن حديث</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">ابحث عن صحة حديث باستخدام محرك بحث "الدرر السنية".</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HadithPage;
